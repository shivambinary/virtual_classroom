import express from "express";
import {
  requestEnrollment,
  approveEnrollment,
  getClassEnrollments, 
} from "../controllers/enrollment.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:classId", requestEnrollment);
router.patch("/:id/approve", approveEnrollment);

router.get("/class/:classId", getClassEnrollments);

export default router;