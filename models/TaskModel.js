import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  scheduledDate: { type: Date, default: Date.now },
  reportedBy: { type: String },
  priority: { type: String },
  completed: { type:String},
});

export const Task = mongoose.model("Task", taskSchema);
