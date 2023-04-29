import express from "express";
const router = express.Router();
import  {Customer} from "../models/customermodel.js"

// Get all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get customers" });
  }
});

// Get a customer by ID
router.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get customer" });
  }
});

// Create a new customer
router.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create customer" });
  }
});

// Update a customer by ID
router.put("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update customer" });
  }
});

// Delete a customer by ID
router.delete("/customers/:id", async (req, res) => {
  try {
    const user = await Customer.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to update user" });
  }
});

// Get booking history of a customer by customer ID
router.get("/customers/:customerId/bookings", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId).populate("bookings");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer.bookings);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get customer bookings" });
  }
});

export default router;
