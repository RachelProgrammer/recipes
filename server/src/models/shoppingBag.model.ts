import mongoose from 'mongoose';

const shoppingItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
}, { _id: true });

const shoppingListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [shoppingItemSchema]
});

const ShoppingList = mongoose.model('ShoppingBag', shoppingListSchema);
export default ShoppingList;
