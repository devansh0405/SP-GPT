import userModel from "../models/userModel.js";
import {
  getAuthUrl,
  getTokensFromCode,
  getGmailClientForTokens,
} from "../services/gmailService.js";

// Redirect user to Google consent screen
export const startGoogleAuth = async (req, res) => {
  const { userId } = req.query;
  const url = getAuthUrl(userId);
  res.json({ url });
};

// Google redirects back with code — save tokens to DB
export const oauth2callback = async (req, res) => {
  const { code, state } = req.query;
  try {
    const tokens = await getTokensFromCode(code);
    const userId = state;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.google = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
      expiry_date: tokens.expiry_date,
    };
    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/notifications?connected=1`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.status(500).send("Google auth failed");
  }
};

// Fetch unread messages only from @spit.ac.in domain
export const getUnreadMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user || !user.google || !user.google.access_token) {
      return res.status(400).json({ message: "Google not connected" });
    }

    const { gmail } = getGmailClientForTokens(user.google);

    // Fetch unread emails from @spit.ac.in
    const listRes = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread from:@spit.ac.in",
      maxResults: 50,
    });

    const messages = listRes.data.messages || [];

    const details = await Promise.all(
      messages.map(async (m) => {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: m.id,
          format: "metadata",
          metadataHeaders: ["From", "Subject", "Date"],
        });

        const headers = msg.data.payload?.headers || [];
        const findHeader = (name) =>
          headers.find((h) => h.name === name)?.value || "";

        const from = findHeader("From") || "";
        const subject = findHeader("Subject") || "";
        const date = findHeader("Date") || "";

        // Double check only @spit.ac.in emails
        if (!from.toLowerCase().includes("@spit.ac.in")) return null;

        return {
          id: msg.data.id,
          threadId: msg.data.threadId,
          snippet: msg.data.snippet || "",
          from,
          subject,
          date,
        };
      })
    );

    const filteredDetails = details.filter(Boolean);
    res.json(filteredDetails);
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Mark single message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !user.google)
      return res.status(400).json({ message: "Google not connected" });

    const { gmail } = getGmailClientForTokens(user.google);

    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: { removeLabelIds: ["UNREAD"] },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Error marking message as read:", err);
    res.status(500).json({ message: "Failed to mark message" });
  }
};

// ✅ NEW: Mark ALL unread @spit.ac.in messages as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user || !user.google)
      return res.status(400).json({ message: "Google not connected" });

    const { gmail } = getGmailClientForTokens(user.google);

    // Get all unread emails from spit.ac.in
    const listRes = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread from:@spit.ac.in",
      maxResults: 100,
    });

    const messages = listRes.data.messages || [];

    if (messages.length === 0) {
      return res.json({ message: "No unread SPIT emails found" });
    }

    // Use batchModify for efficiency
    const ids = messages.map((m) => m.id);
    await gmail.users.messages.batchModify({
      userId: "me",
      requestBody: {
        ids,
        removeLabelIds: ["UNREAD"],
      },
    });

    res.json({ ok: true, count: ids.length, message: "All marked as read" });
  } catch (err) {
    console.error("Error marking all as read:", err);
    res.status(500).json({ message: "Failed to mark all messages" });
  }
};
