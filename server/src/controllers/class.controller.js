import * as classService from "../services/class.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createClass = asyncHandler(async (req, res) => {
  const result = await classService.createClass(req.body, req.user);

  res.status(201).json({
    status: "success",
    data: result
  });
});

export const getMyClasses = asyncHandler(async (req, res) => {
  const result = await classService.getTeacherClasses(req.user);

  res.status(200).json({
    status: "success",
    data: result
  });
});

export const getAllClasses = asyncHandler(async (req, res) => {
  const result = await classService.getAllClasses();

  res.status(200).json({
    status: "success",
    data: result
  });
});

export const getClassDetails = asyncHandler(async (req, res) => {

  const result = await classService.getClassWithStudents(req.params.id);

  res.status(200).json({
    status: "success",
    data: result
  });

});