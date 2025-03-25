const mongoose = require('mongoose');

const baySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserId: { type: Number, required: true },
    Count: { type: Number, required: true }
});

const Bay = mongoose.model('Bay', baySchema);
module.exports = Bay;
