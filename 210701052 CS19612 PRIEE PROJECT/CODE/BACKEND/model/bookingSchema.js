const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  prisonerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prisoner',
    required: true
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
