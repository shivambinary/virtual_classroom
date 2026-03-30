import * as classService from "../services/class.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createClass = asyncHandler(async (req, res) => {

  const newClass = await classService.createClass({
    name: req.body.name,
    teacherId: req.user.userId
  });

  res.status(201).json({
    status: "success",
    data: newClass
  });

});


export const getClasses = asyncHandler(async (req, res) => {

  const classes = await classService.getAllClasses();

  res.status(200).json({
    status: "success",
    data: classes
  });

});


export const joinClass = asyncHandler(async (req, res) => {

  const classroom = await classService.joinClass(
    req.params.id,
    req.user.userId
  );

  res.status(200).json({
    status: "success",
    data: classroom
  });

});