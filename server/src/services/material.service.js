import Material from "../models/material.model.js";
import Class from "../models/class.model.js";
import ApiError from "../utils/ApiError.js";



export const uploadMaterial = async (data, user) => {

  const classData = await Class.findById(data.classId);

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  if (classData.teacher.toString() !== user.id.toString()) {
    throw new ApiError(403, "Only teacher can upload material");
  }

  const material = await Material.create({
    class: data.classId,
    title: data.title,
    fileUrl: data.fileUrl,
    uploadedBy: user.id
  });

  return material;
};



export const getClassMaterials = async (classId, user) => {

  const classData = await Class.findById(classId);

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  return Material.find({ class: classId })
    .sort({ createdAt: -1 });

};