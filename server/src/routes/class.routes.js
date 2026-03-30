import express from "express";
import {
  createClass,
  getClasses,
  joinClass
} from "../controllers/class.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createClass);

router.get("/", authMiddleware, getClasses);

router.post("/:id/join", authMiddleware, joinClass);

export default router;