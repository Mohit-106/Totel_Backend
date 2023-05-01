import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  guestName: {
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
  roomNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'checked-out', 'cancelled'],
    default: 'booked',
  },
});

export const Reservation = mongoose.model('Reservation', reservationSchema);


