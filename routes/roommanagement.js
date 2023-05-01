import express from "express";
const router = express.Router();
import  {Room} from "../models/RoomManagementModel.js"


// GET all rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one room
router.get("/rooms/:id", getRoom, (req, res) => {
  res.json(res.room);
});

// CREATE one room
router.post("/rooms", async (req, res) => {
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
});

// UPDATE one room
router.patch("/rooms/:id", getRoom, async (req, res) => {
  if (req.body.roomNumber != null) {
    res.room.roomNumber = req.body.roomNumber;
  }
  if (req.body.roomType != null) {
    res.room.roomType = req.body.roomType;
  }
  if (req.body.rate != null) {
    res.room.rate = req.body.rate;
  }
  if (req.body.available != null) {
    res.room.available = req.body.available;
  }
  try {
    const updatedRoom = await res.room.save();
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one room
router.delete("/rooms/:id", getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware function to get a room by id
async function getRoom(req, res, next) {
  let room;
  try {
    room = await Room.findById(req.params.id);
    if (room == null) {
      return res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.room = room;
  next();
}

export default router;
