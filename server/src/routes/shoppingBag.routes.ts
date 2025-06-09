import { Router } from 'express';
import { addItemToCart, deleteCart, deleteItemFromCart, getUserCart } from '../controllers/shoppingBag.controller';

const router = Router();

router.post('/', addItemToCart)
router.get('/', getUserCart)
router.delete('/', deleteCart)
router.delete('/:itemId', deleteItemFromCart);

export default router;