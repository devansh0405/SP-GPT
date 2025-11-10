// A very simple poller — good for MVP.
// You can run it after server boots.

import userModel from "../models/userModel.js";
import { getGmailClientForTokens } from "./gmailService.js";

export const startGmailPoller = (io, intervalMs = 30000) => {
  // Map to store lastSeen message ids per user (in-memory). For production use persistent storage.
  const lastSeen = new Map();

  setInterval(async () => {
    try {
      const users = await userModel.find({ "google.access_token": { $exists: true } });
      for (const user of users) {
        try {
          const { gmail } = getGmailClientForTokens(user.google);
          const listRes = await gmail.users.messages.list({
            userId: "me",
            q: "is:unread",
            maxResults: 10
          });
          const messages = listRes.data.messages || [];
          const ids = messages.map(m => m.id);

          const prev = lastSeen.get(user.id) || [];
          // Find new ids that weren't in previous snapshot
          const newIds = ids.filter(id => !prev.includes(id));
          if (newIds.length) {
            // fetch minimal details
            const details = await Promise.all(newIds.map(async (id) => {
              const msg = await gmail.users.messages.get({
                userId: "me",
                id,
                format: "metadata",
                metadataHeaders: ["From","Subject","Date"]
              });
              const headers = msg.data.payload?.headers || [];
              const findHeader = name => headers.find(h => h.name === name)?.value || "";
              return {
                id: msg.data.id,
                threadId: msg.data.threadId,
                snippet: msg.data.snippet || "",
                from: findHeader("From"),
                subject: findHeader("Subject"),
                date: findHeader("Date")
              };
            }));

            // Emit to the user room: assume you join socket rooms named by userId when they connect
            io.to(user.id).emit("gmail:new", details);
          }

          lastSeen.set(user.id, ids);
        } catch (e) {
          console.error("Poll error for user", user.email, e.message);
        }
      }
    } catch (e) {
      console.error("Poller top-level error", e);
    }
  }, intervalMs);
};
