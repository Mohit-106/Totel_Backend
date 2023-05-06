import express from "express";
import  {Customer} from "../models/customermodel.js"
const customerRouter = express();

customerRouter.route("/")
.get(getCustomer)
.post(setCustomer);

customerRouter
  .route("/:id")
  .get(getCustomerByID)
  .patch(updateCustomerByID)
  .delete(deleteCustomerByID)

// Get all customers
async function getCustomer(req, res){
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get customers" });
  }
};

// Get a customer by ID
async function  getCustomerByID(req, res){
  try {
    const data = await Customer.findById({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to get user" });
  }
};

// Create a new customer
async function setCustomer(req, res){
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create customer" });
  }
};

// Update a customer by ID
async function updateCustomerByID(req, res){
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
};

// Delete a customer by ID
async function deleteCustomerByID(req, res){
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
};

export default customerRouter;
