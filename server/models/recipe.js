const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    Name: String,
    Count: String, // Using string to allow fractions (e.g., "1/3")
    Type: String
});

const recipeSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserId: { type: Number, required: true },
    CategoryId: { type: Number, required: true },
    Img: { type: String, required: true },
    Duration: { type: String, required: true },
    Difficulty: { type: Number, required: true },
    Description: { type: String, required: true },
    Ingrident: [ingredientSchema], // Nested ingredients array
    Instructions: [String] // Array of steps
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
