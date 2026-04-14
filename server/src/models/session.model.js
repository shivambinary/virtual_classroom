import mongoose from "mongoose";
import { SessionState } from "../constants/session.constants.js";

const sessionSchema = new mongoose.Schema(
{
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    index: true
  },

  state: {
    type: String,
    enum: Object.values(SessionState),
    default: SessionState.SCHEDULED,
    index: true
  },

  scheduledAt: {
    type: Date,
    required: true
  },

  startedAt: Date,
  endedAt: Date,

  unstableSince: Date,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  meetingLink: {
  type: String,
  default: null
}

},
{
  timestamps: true
}
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;