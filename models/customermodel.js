import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    bookingHistory: [
      {
        date: { type: Date, default: Date.now },
        roomType: { type: String },
        checkInDate: { type: Date },
        checkOutDate: { type: Date },
        guests: {
          adults: { type: Number },
          children: { type: Number },
        },
      },
    ],
    preferences: {
      smoking: { type: Boolean },
      roomType: { type: String },
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", customerSchema);
