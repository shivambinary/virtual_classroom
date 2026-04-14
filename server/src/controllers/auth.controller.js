import * as authService from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Login Successful"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile({ userId: req.user.id });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.editProfile({
    userId: req.user.id,
    data: req.body
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Updated"));
});