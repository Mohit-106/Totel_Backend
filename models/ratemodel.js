import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
});

export const Rate = mongoose.model("Rate", rateSchema);
