import express from "express";
const reservationRouter = express.Router();
import { Reservation } from "../models/reservationmodel.js";

reservationRouter.route("/").get(getReservations).post(setReservation);
reservationRouter
  .route("/:id")
  .get(getReservationsByID)
  .patch(updateReservationByID)
  .delete(deleteReservationByID);

async function setReservation(req, res) {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
}

//Get Reservations
async function getReservations(req, res) {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Get Reservations by ID
async function getReservationsByID(req, res) {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
}

// UPDATE Reservation
async function updateReservationByID(req, res) {
  try {
    const { guestName, checkInDate, checkOutDate, roomNumber, status } =
      req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { guestName, checkInDate, checkOutDate, roomNumber, status },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: "reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update Reservation" });
  }
}

//Delete Reservation By ID
async function deleteReservationByID(req, res) {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default reservationRouter;
