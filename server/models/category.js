// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Id: { type: Number, required: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
