import express from "express";
import { startGoogleAuth, oauth2callback, getUnreadMessages, markMessageAsRead, markAllAsRead } from "../controllers/gmailController.js";
import authMiddleware from "../middleware/auth.js"; // your JWT/session middleware

const gmailRouter = express.Router();

gmailRouter.get("/auth/url", authMiddleware, startGoogleAuth);            // returns URL to open
gmailRouter.get("/oauth2callback", oauth2callback);                   // Google redirect
gmailRouter.get("/unread", authMiddleware, getUnreadMessages);            // get list of unread
gmailRouter.post("/mark-read", authMiddleware, markMessageAsRead);        // mark as read
gmailRouter.post("/mark-all-read", authMiddleware, markAllAsRead);

export default gmailRouter;