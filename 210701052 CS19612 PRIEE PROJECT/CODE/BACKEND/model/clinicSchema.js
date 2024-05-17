const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    phone_no: String,
    name: String,
    email_id: String,
    location: String,
    products: [String]
});

module.exports = mongoose.model('Clinic', clinicSchema);
