import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
{
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{
  timestamps: true
}
);

const Material = mongoose.model("Material", materialSchema);

export default Material;