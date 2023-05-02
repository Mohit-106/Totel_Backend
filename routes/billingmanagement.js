import express from "express";
const app = express.Router();
import { Bill } from "../models/billingmodel.js";

app.post('/bills', async (req, res) => {
    try {
      const { guestName, roomNumber, checkInDate, checkOutDate, totalAmount, paymentMethod } = req.body;
  
      const bill = new Bill({
        guestName,
        roomNumber,
        checkInDate,
        checkOutDate,
        totalAmount,
        paymentMethod,
      });
  
      await bill.save();
  
      res.status(201).json({ message: 'Bill created successfully', bill });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  app.put('/bills/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { paidAmount } = req.body;
  
      const bill = await Bill.findByIdAndUpdate(id, { paidAmount, paymentStatus: 'partial' }, { new: true });
  
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.json({ message: 'Bill updated successfully', bill });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  app.delete('/bills/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const bill = await Bill.findByIdAndDelete(id);
  
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.json({ message: 'Bill deleted successfully', bill });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  app.get('/bills/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const bill = await Bill.findById(id);
  
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.json(bill);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  