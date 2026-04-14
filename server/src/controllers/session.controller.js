import * as sessionService from "../services/session.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const scheduleSession = asyncHandler(async (req, res) => {

  const result = await sessionService.scheduleSession(req.body, req.user);

  res.status(201).json({
    status: "success",
    data: result
  });

});


export const startSession = asyncHandler(async (req, res) => {

  const result = await sessionService.startSession(
    req.params.id,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});


export const endSession = asyncHandler(async (req, res) => {

  const result = await sessionService.endSession(
    req.params.id,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});

export const getSession = asyncHandler(async (req, res) => {

  const result = await sessionService.getSessionById(
    req.params.id,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});

export const getClassSessions = asyncHandler(async (req, res) => {

  const result = await sessionService.getSessionsByClass(
    req.params.classId,
    req.user
  );

  res.status(200).json({
    status: "success",
    data: result
  });

});