import Enrollment from "../models/enrollment.model.js";
import Class from "../models/class.model.js";
import ApiError from "../utils/ApiError.js";

export const requestEnrollment = async (classId, user) => {

  if (user.role !== "student") {
    throw new ApiError(403, "Only students can join classes");
  }

  const classExists = await Class.findById(classId);
  if (!classExists) {
    throw new ApiError(404, "Class not found");
  }

  const enrollment = await Enrollment.create({
    class: classId,
    student: user.id
  });

  return enrollment;
};


export const approveEnrollment = async (enrollmentId, user) => {

  const enrollment = await Enrollment.findById(enrollmentId)
    .populate("class");

  if (!enrollment) {
    throw new ApiError(404, "Enrollment not found");
  }

  if (enrollment.class.teacher.toString() !== user.id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  enrollment.status = "approved";
  await enrollment.save();

  return enrollment;
};

export const getClassEnrollments = async (classId, user) => {

  const classData = await Class.findById(classId);

  if (!classData) {
    throw new ApiError(404, "Class not found");
  }

  if (classData.teacher.toString() !== user.userId) {
    throw new ApiError(403, "Not authorized");
  }

  const enrollments = await Enrollment.find({ class: classId })
    .populate("student", "name email role")
    .sort({ createdAt: -1 });

  return enrollments;
};