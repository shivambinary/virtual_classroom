import express from "express";
import {
  createClass,
  getMyClasses,
  getAllClasses, getClassDetails
} from "../controllers/class.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createClass);
router.get("/my", getMyClasses);
router.get("/", getAllClasses);
router.get("/:id/details", getClassDetails);

export default router;