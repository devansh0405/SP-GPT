import express from "express";
import { loginToMoodle, getAssignments } from "../controllers/moodleController.js";

const moodleRouter = express.Router();

moodleRouter.post("/login", loginToMoodle);  // Login to Moodle and get token
moodleRouter.get("/assignments", getAssignments); // Fetch all assignments

export default moodleRouter;
