import express from "express";
import {
  uploadMaterial,
  getMaterials
} from "../controllers/material.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; 

const router = express.Router();

router.use(authMiddleware);

router.post("/", upload.single("file"), uploadMaterial);
router.get("/:classId", getMaterials);

export default router;