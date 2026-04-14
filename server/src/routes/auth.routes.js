import express from 'express';
import * as authController from "../controllers/auth.controller.js";
import { protect } from '../middlewares/auth.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);


router.get("/profile", protect, authController.getProfile);
router.get("/updateProfile", protect, authController.updateProfile);

export default router;