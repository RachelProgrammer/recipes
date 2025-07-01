import mongoose from 'mongoose';

const shoppingItemRefSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    count: { type: Number, required: true, default: 1 },
}, { _id: true });


const shoppingItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    refs: [shoppingItemRefSchema]
}, { _id: true });


const shoppingListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [shoppingItemSchema]
});

const ShoppingList = mongoose.model('ShoppingBag', shoppingListSchema);
export default ShoppingList;
