import api from "../../services/api";

export const uploadMaterial = (data) =>
  api.post("/materials", data);

export const getMaterials = (classId) =>
  api.get(`/materials/${classId}`);