// Import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const DATABASE_URL="mongodb+srv://admin:JVbzCDVeKr0JnODE@cluster0.meiuaxw.mongodb.net/?retryWrites=true&w=majority";
// Load environment variables
dotenv.config();

// Set up Express app
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Set up MongoDB connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Define user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('userModel',userSchema);

