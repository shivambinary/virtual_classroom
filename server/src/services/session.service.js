import Session from "../models/session.model.js";
import Class from "../models/class.model.js";
import ApiError from "../utils/ApiError.js";
import {
  AllowedTransitions,
  SessionState,
  SESSION_TIMEOUT
} from "../constants/session.constants.js";
import Enrollment from "../models/enrollment.model.js";



const validateTransition = (currentState, nextState) => {
  return AllowedTransitions[currentState]?.includes(nextState);
};



export const scheduleSession = async (data, user) => {

  const classData = await Class.findById(data.classId);

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  if (classData.teacher.toString() !== user.id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  const session = await Session.create({
    class: data.classId,
    scheduledAt: data.scheduledAt,
    createdBy: user.id
  });

  return session;
};



export const startSession = async (sessionId, user) => {

  const session = await Session.findById(sessionId).populate("class");

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.class.teacher.toString() !== user.id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  if (!validateTransition(session.state, SessionState.LIVE)) {
    throw new ApiError(400, "Invalid state transition");
  }

  session.state = SessionState.LIVE;
  session.startedAt = new Date();

  const baseUrl = process.env.VIDEO_BASE_URL;
  session.meetingLink = `${baseUrl}/session-${session._id}`;

  await session.save();

  return session;
};



export const markUnstable = async (sessionId) => {

  const session = await Session.findById(sessionId);

  if (!session) return;

  if (!validateTransition(session.state, SessionState.UNSTABLE)) return;

  session.state = SessionState.UNSTABLE;
  session.unstableSince = new Date();

  await session.save();
};



export const recoverSession = async (sessionId) => {

  const session = await Session.findById(sessionId);

  if (!session) return;

  if (!validateTransition(session.state, SessionState.LIVE)) return;

  session.state = SessionState.LIVE;
  session.unstableSince = null;

  await session.save();
};



export const endSession = async (sessionId, user) => {

  const session = await Session.findById(sessionId).populate("class");

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.class.teacher.toString() !== user.id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  if (!validateTransition(session.state, SessionState.ENDED)) {
    throw new ApiError(400, "Invalid state transition");
  }

  session.state = SessionState.ENDED;
  session.endedAt = new Date();

  await session.save();

  return session;
};



export const handleSessionTimeout = async () => {

  const sessions = await Session.find({
    state: SessionState.UNSTABLE
  });

  const now = Date.now();

  for (const session of sessions) {
    if (
      session.unstableSince &&
      now - session.unstableSince.getTime() > SESSION_TIMEOUT
    ) {
      session.state = SessionState.ENDED;
      session.endedAt = new Date();
      await session.save();
    }
  }
};

export const getSessionById = async (sessionId, user) => {

  const session = await Session.findById(sessionId).populate("class");

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.class.teacher.toString() === user.userId) {
    return session;
  }

  const enrollment = await Enrollment.findOne({
    class: session.class._id,
    student: user.userId,
    status: "approved"
  });

  if (!enrollment) {
    throw new ApiError(403, "Access denied");
  }

  return session;
};

export const getSessionsByClass = async (classId, user) => {

  const classData = await Class.findById(classId);

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  if (classData.teacher.toString() === user.id.toString()) {
    return Session.find({ class: classId }).sort({ createdAt: -1 });
  }

  const enrollment = await Enrollment.findOne({
    class: classId,
    student: user.id,
    status: "approved"
  });

  if (!enrollment) {
    throw new ApiError(403, "Access denied");
  }

  return Session.find({ class: classId }).sort({ createdAt: -1 });
};