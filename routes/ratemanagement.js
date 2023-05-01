import express from "express";
const app = express.Router();
import { Rate } from "../models/ratemodel.js";


app.post("/rates", async (req, res) => {
  try {
    const newRate = new Rate(req.body);
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get("/rates", async (req, res) => {
  try {
    const rates = await Rate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/rates/:id", getRate, (req, res) => {
  res.json(res.rate);
});

async function getRate(req, res, next) {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }
    res.rate = rate;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


app.patch("/rates/:id", getRate, async (req, res) => {
  if (req.body.roomType != null) {
    res.rate.roomType = req.body.roomType;
  }
  if (req.body.rate != null) {
    res.rate.rate = req.body.rate;
  }
  if (req.body.startDate != null) {
    res.rate.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.rate.endDate = req.body.endDate;
  }
  if (req.body.description != null) {
    res.rate.description = req.body.description;
  }
  try {
    const updatedRate = await res.rate.save();
    res.json(updatedRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete("/rates/:id", getRate, async (req, res) => {
  try {
    await res.rate.remove();
    res.json({ message: "Rate deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;

