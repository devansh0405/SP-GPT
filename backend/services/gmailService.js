import { google } from "googleapis";

const { OAuth2 } = google.auth;

export const createOAuth2Client = () => {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );
};

// Generates auth URL for user to consent
export const getAuthUrl = (state) => {
  const oAuth2Client = createOAuth2Client();
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify"
  ];

  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    state // optional: pass user id or redirect info
  });
  return url;
};

// Exchange code for tokens and set credentials
export const getTokensFromCode = async (code) => {
  const oAuth2Client = createOAuth2Client();
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens; // { access_token, refresh_token, expiry_date, ... }
};

// Construct gmail client for a user (tokens from DB)
export const getGmailClientForTokens = (tokens) => {
  const oAuth2Client = createOAuth2Client();
  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  return { gmail, oAuth2Client };
};
