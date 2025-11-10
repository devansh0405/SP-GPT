// server.js

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as IO } from "socket.io";
import { connectDB } from "./config/db.js";
import "dotenv/config";

import userRouter from "./routes/userRoute.js";
import learningRouter from "./routes/learningRoute.js";
import moodleRouter from "./routes/moodleRoute.js";
import gmailRouter from "./routes/gmailRoute.js";

import { startGmailPoller } from "./services/gmailPoller.js"; // Gmail polling service

// App config
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // update to your frontend URL for security
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// DB connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/learning", learningRouter);
app.use("/api/moodle", moodleRouter);
app.use("/api/gmail", gmailRouter);

// Root route
app.get("/", (req, res) => {
  res.send("SPGPT Backend API is running...");
});

// ✅ Create HTTP + Socket.IO server
const httpServer = createServer(app);
const io = new IO(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || "*", methods: ["GET", "POST"] },
});

// ✅ Handle real-time socket connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("auth", (payload) => {
    const userId = payload?.userId;
    if (userId) {
      socket.join(userId); // create a private room for this user
      console.log(`User ${userId} joined their socket room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ Start Gmail Poller every 30 seconds (push updates to connected clients)
startGmailPoller(io, 30000);

// ✅ Start the server
httpServer.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
