import express from "express";
import {
  scheduleSession,
  startSession,
  endSession,
  getSession, getClassSessions
} from "../controllers/session.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", scheduleSession);
router.get("/:id", getSession);
router.post("/:id/start", startSession);
router.post("/:id/end", endSession);
router.get("/class/:classId", getClassSessions);

export default router;