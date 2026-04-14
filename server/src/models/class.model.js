import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Class name is required"],
    trim: true,
    minlength: 2
  },

  description: {
    type: String,
    trim: true,
    default: ""
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  }

},
{
  timestamps: true
}
);

const Class = mongoose.model("Class", classSchema);

export default Class;