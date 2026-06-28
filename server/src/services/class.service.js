import Class from "../models/class.model.js";
import ApiError from "../utils/ApiError.js";
import Enrollment from "../models/enrollment.model.js";

export const createClass = async (data, user) => {
  console.log("USER:", user);

  if (user.role !== "teacher") {
    throw new ApiError(403, "Only teachers can create classes");
  }

  const newClass = await Class.create({
    name: data.name,
    description: data.description,
    teacher: user.id
  });

  return newClass;
};


export const getTeacherClasses = async (user) => {

  return Class.find({ teacher: user.id }).sort({ createdAt: -1 });

};


export const getAllClasses = async () => {

  return Class.find().populate("teacher", "name email").sort({ createdAt: -1 });

};


export const getClassWithStudents = async (classId) => {

  const classData = await Class.findById(classId)
    .populate("teacher", "name email");

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  const enrollments = await Enrollment.find({
    class: classId,
    status: "approved"
  }).populate("student", "name email");

  const students = enrollments.map(e => e.student);

  return {
    ...classData.toObject(),
    students  
  };
};