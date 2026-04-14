import * as materialService from "../services/material.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const uploadMaterial = asyncHandler(async (req, res) => {

  if (!req.file) {
    throw new ApiError(400, "File is required");
  }

  const fileUrl = req.file.path; // ✅ Cloudinary URL

  const result = await materialService.uploadMaterial(
    {
      ...req.body,
      fileUrl
    },
    req.user
  );

  res.status(201).json({
    status: "success",
    data: result
  });

});


export const getMaterials = asyncHandler(async (req, res) => {

  const result = await materialService.getClassMaterials(
    req.params.classId,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});