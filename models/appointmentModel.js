const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
  userId: {
    type: String,
    // required: true,
  },
  doctorId: {
    type: String,
    // required: true,
  },
  doctorinfo: {
    type: String,
    // required: true,
  },
  userInfo: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  status: {  // fixed spelling from 'staus' to 'status'
    type: String,
    // required: true,
    default: 'pending', // assuming you want it default to 'pending', not `true`
  },
  time: {
    type: String,
    // required: true,
  },
}, { timestamps: true });

const appointmentModel = mongoose.model('appointment', appointment);

// ✅ CORRECT export
module.exports = appointmentModel;
