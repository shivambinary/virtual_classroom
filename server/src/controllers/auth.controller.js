import { registerUser, loginUser, getProfile } from "../services/auth.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: "success",
    data: user
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    status: "success",
    data: result
  });
});

export const profile = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user.id);

  res.status(200).json({
    status: "success",
    data: user
  });
});

export const update = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user.id, req.body);

  res.status(200).json({
    status: "success",
    data: user
  });
});