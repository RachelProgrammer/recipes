import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount:{type: Number,required:true},
    description: { type: String, required: true },

});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: false },
    difficulty: { type: Number, required: false },
    description: { type: String, required: false },
    servings: { type: Number, required: false },
    ingredients: { type: [ingredientSchema], required: false },
    instructions: { type: [String], required: false }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
