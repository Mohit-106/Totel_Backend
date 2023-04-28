import express from "express";
import { User } from "../models/usermodel.js";
const app = express();

// Create a new user
app.post("/users", async (req, res) => {
    console.log("hi from user post")
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create user" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get users" });
  }
});

// Get a user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update user" });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update user" });
  }
});

export default app;



// {
//     "name":
//     "Mohit",
//     "email":
//     "mohit@gmail.com",
//     "password":
//     "123456",
//     "role":
//     "Admin"
//     }
