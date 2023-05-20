import express from "express";
import { ChatRoom } from "../models/chatroom.js";
const app = express.Router();

// Create the routes
app.post("/messages", (req, res) => {
  try {
    const { sender, recipient, message } = req.body;
    const data = new ChatRoom({ sender, recipient, message });
    data.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create" });
  }
});

app.get("/messages/:id", (req, res) => {
  try {
    const data = ChatRoom.findById({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
});

app.delete("/messages/:id", (req, res) => {
  try {
    const chat = ChatRoom.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).send();
    }
  
    res.send(chat, "Deleted Chat");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;




 
