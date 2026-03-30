import Class from "../models/class.model.js";
import ApiError from "../utils/ApiError.js";

export const createClass = async ({ name, teacherId }) => {

  const newClass = await Class.create({
    name,
    teacher: teacherId
  });

  return newClass;
};


export const getAllClasses = async () => {

  const classes = await Class.find()
    .populate("teacher", "name email")
    .populate("students", "name email");

  return classes;
};


export const joinClass = async (classId, studentId) => {

  const classroom = await Class.findById(classId);

  if (!classroom) {
    throw new ApiError(404, "Class not found");
  }

  if (classroom.students.includes(studentId)) {
    throw new ApiError(400, "Already joined");
  }

  classroom.students.push(studentId);

  await classroom.save();

  return classroom;
};