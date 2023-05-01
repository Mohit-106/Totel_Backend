import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

export const Room = mongoose.model("Room", roomSchema);

