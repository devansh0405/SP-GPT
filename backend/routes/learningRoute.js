import express from "express"
import { getSubjects, getModulesForSubject, getSubmodule } from "../controllers/learningController.js";

const learningRouter = express.Router();

// Get all subjects (optionally filter by year ?year=SE)
learningRouter.get("/subjects", getSubjects);

// Get all modules for a subject
learningRouter.get("/subjects/:subjectId/modules", getModulesForSubject);

// Get details of a single submodule
learningRouter.get("/submodules/:submoduleId", getSubmodule);

export default learningRouter;