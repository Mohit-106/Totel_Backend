import express from "express";
const billing = express.Router();
import { Bill } from "../models/billingmodel.js";

billing.route("/").get(getBilling).post(setBilling);

billing
  .route("/:id")
  .get(getBillingByID)
  .patch(updateBillingByID)
  .delete(deleteBillingByID);

async function setBilling(req, res) {
  try {
    const {
      guestName,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalAmount,
      paymentMethod,
    } = req.body;

    const bill = new Bill({
      guestName,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalAmount,
      paymentMethod,
    });

    await bill.save();

    res.status(201).json({ message: "Bill created successfully", bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBilling(req, res) {
  try {
    const { id } = req.params;
    const { paidAmount } = req.body;

    const bill = await Bill.findByIdAndUpdate(
      id,
      { paidAmount, paymentStatus: "partial" },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json({ message: "Bill updated successfully", bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteBillingByID(req, res) {
  try {
    const { id } = req.params;

    const bill = await Bill.findByIdAndDelete(id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json({ message: "Bill deleted successfully", bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getBillingByID(req, res) {
  try {
    const { id } = req.params;

    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(bill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateBillingByID(req, res) {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bill) {
      return res.status(404).json({ message: "bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update bill" });
  }
}

export default billing;
