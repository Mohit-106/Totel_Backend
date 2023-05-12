import { ChatRoom } from "../models/chatroom.js";
import express from "express";
const app = express.Router();

// chatRouter.route("/").get(getChat).post(setChat);
// chatRouter
//.route("/:id")
//.get(getChatById)
//.post(addChatRoomToChatRoom)

// Create the routes
app.post("/messages", (req, res) => {
  try {
    const { sender, recipient, message} = req.body;
    const data = new ChatRoom({ sender, recipient, message });
    data.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create" });
  }
});

app.get("/messages/:sender/:recipient", (req, res) => {
  // Get the sender and recipient from the request path
  const sender = req.params.sender;
  const recipient = req.params.recipient;

  // Get all messages for the given sender and recipient
  ChatRoom.find({
    sender,
    recipient,
  }, (err, messages) => {
    if (err) {
      res.status(500).send("Error getting messages");
    } else {
      res.status(200).send(messages);
    }
  });
});

app.delete("/messages/:id", (req, res) => {
  try {
    const chat =  ChatRoom.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).send();
    }
    res.send(chat,"deleted chat");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;