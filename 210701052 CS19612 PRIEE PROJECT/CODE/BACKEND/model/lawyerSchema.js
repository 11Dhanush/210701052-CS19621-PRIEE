const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    phone_no: String,
    name: String,
    age: Number,
    gender: String,
    specialization: String,
    email_id: String
});

module.exports = mongoose.model('Lawyer', lawyerSchema);
