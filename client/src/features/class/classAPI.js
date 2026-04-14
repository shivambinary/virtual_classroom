import api from "../../services/api";

export const getMyClasses = () => api.get("/classes/my");
export const getAllClasses = () => api.get("/classes");

export const createClass = (data) => api.post("/classes", data);
export const getClassById = (id) =>
  api.get(`/classes/${id}`);