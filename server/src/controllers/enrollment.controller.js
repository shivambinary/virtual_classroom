import * as enrollmentService from "../services/enrollment.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const requestEnrollment = asyncHandler(async (req, res) => {
  const result = await enrollmentService.requestEnrollment(
    req.params.classId,
    req.user
  );

  res.status(201).json({
    status: "success",
    data: result
  });
});

export const approveEnrollment = asyncHandler(async (req, res) => {
  const result = await enrollmentService.approveEnrollment(
    req.params.id,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });
});

export const getClassEnrollments = asyncHandler(async (req, res) => {

  const result = await enrollmentService.getClassEnrollments(
    req.params.classId,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});