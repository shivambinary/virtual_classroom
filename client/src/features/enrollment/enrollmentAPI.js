import api from "../../services/api";

export const requestEnrollment = (classId) =>
  api.post(`/enrollments/${classId}`);

export const approveEnrollment = (id) =>
  api.patch(`/enrollments/${id}/approve`);

export const getEnrollments = (classId) =>
  api.get(`/enrollments/class/${classId}`);