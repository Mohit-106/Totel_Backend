import express from "express";
const rateRouter = express.Router();
import { Rate } from "../models/ratemodel.js";

rateRouter.route("/").get(getRate).post(setRate);
rateRouter
  .route("/:id")
  .get(getRateById)
  .patch(updateRateByID)
  .delete(deleteRateByID);

// Create a new rate
async function setRate(req, res) {
  try {
    const { roomType, rate, startDate, endDate, description } = req.body;
    const data = new Rate({ roomType, rate, startDate, endDate, description });
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create" });
  }
}

// Get all rates
async function getRate(req, res) {
  try {
    const data = await Rate.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get" });
  }
}

// Get a rate by ID
async function getRateById(req, res) {
  try {
    const data = await Rate.findById({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
}

// Update a user by ID
async function updateRateByID(req, res) {
  try {
    const { roomType, rate, startDate, endDate, description } = req.body;
    const data = await Rate.findByIdAndUpdate(
      req.params.id,
      { roomType, rate, startDate, endDate, description },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update data" });
  }
}

// Delete a user by ID
async function deleteRateByID(req, res) {
  try {
    const user = await Rate.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(204).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update " });
  }
}

export default rateRouter;
