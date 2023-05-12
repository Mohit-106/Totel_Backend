import mongoose from "mongoose";
// Create the schema for the messages
const ChatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatRoom = mongoose.model("Chat", ChatSchema);