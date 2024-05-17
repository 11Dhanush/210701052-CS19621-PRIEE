const mongoose = require('mongoose');

const prisonerSchema = new mongoose.Schema({
    phone_no: String,
    name: String,
    age: Number,
    gender: String,
    current_sentence: String,
    release_date: Date,
    educational_level: String
});

module.exports = mongoose.model('Prisoner', prisonerSchema);
