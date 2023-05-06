import express from "express";
import { Room } from "../models/RoomManagementModel.js";
const roomRouter = express();

roomRouter.route("/").get(getRooms).post(setRooms);
roomRouter
  .route("/:id")
  .get(getRoomById)
  .patch(updateRoomByID)
  .delete(deleteRoomByID);

// CREATE one room
async function setRooms(req, res) {
  const room = new Room({
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    rate: req.body.rate,
    available: req.body.available,
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET all rooms
async function getRooms(req, res) {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE one room
async function updateRoomByID(req, res){
  try {
    const { roomNumber, roomType, rate, available } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, roomType, rate, available },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update Room" });
  }
};


async function getRoomById(req, res){
  try {
    const room = await Room.findById({_id:req.params.id});
    if (!room) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
};

// Delete a user by ID
async function deleteRoomByID(req, res){
  try {
    const user = await Room.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update user" });
  }
};

export default roomRouter;
