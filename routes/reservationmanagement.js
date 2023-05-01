import express from "express";
const app = express.Router();
import { Reservation } from "../models/reservationmodel.js";

app.post("/reservations", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/reservations/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "guestName",
    "checkInDate",
    "checkOutDate",
    "roomNumber",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    updates.forEach((update) => (reservation[update] = req.body[update]));
    await reservation.save();
    res.send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
