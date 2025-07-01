import { Router } from 'express';
import { addAllItemsToCart, addItemToCart, deleteCart, deleteItemFromCart, getUserCart, removeItemFromCart } from '../controllers/shoppingBag.controller';

const router = Router();

router.get('/', getUserCart)
router.delete('/', deleteCart)
router.delete('/:itemId', deleteItemFromCart);
router.post('/inc', addItemToCart)
router.post('/dec', removeItemFromCart);
router.post('/all/:recipeId', addAllItemsToCart);

export default router;