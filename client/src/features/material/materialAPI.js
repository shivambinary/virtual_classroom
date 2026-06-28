
import api from "../../services/api";

export const uploadMaterial = (formData) =>
  api.post("/materials", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMaterials = (classId) =>
  api.get(`/materials/${classId}`);