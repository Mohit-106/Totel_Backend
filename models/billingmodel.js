import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid',
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

export const Bill = mongoose.model('Bill', billSchema);


