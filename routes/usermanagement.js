import express from "express";
import { User } from "../models/usermodel.js";
const userRouter = express();

userRouter
.route('/')
.get(getUsers)
.post(setUser)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUserByID)
.delete(deleteUserByID);

// Create a new user
async function setUser(req, res){
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create user" });
  }
};

// Get all users
async function getUsers(req, res){
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get users" });
  }
};

// Get a user by ID
async function getUserById(req, res){
  try {
    const user = await User.findById({_id:req.params.id});
    const user2 = await User.findOne({email:"mohixcxcxct@gmail.com"})
    console.log(user2); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
};

// Update a user by ID
async function updateUserByID(req, res){
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
};

// Delete a user by ID
async function deleteUserByID(req, res){
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
};

export default userRouter;




