import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },

  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "teacher"
  }

},
{
  timestamps: true
}
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    throw new Error("Password not selected. Use .select('+password')");
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;