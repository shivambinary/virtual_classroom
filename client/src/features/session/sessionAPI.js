import api from "../../services/api";

export const getSessionsByClass = (classId) =>
  api.get(`/sessions/class/${classId}`);

export const createSession = (data) =>
  api.post("/sessions", data);

export const startSession = (sessionId) =>
  api.post(`/sessions/${sessionId}/start`);

export const endSession = (sessionId) =>
  api.post(`/sessions/${sessionId}/end`);