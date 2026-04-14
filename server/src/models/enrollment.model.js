import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
{
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    index: true
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    index: true
  }

},
{
  timestamps: true
}
);

enrollmentSchema.index({ class: 1, student: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;