import { Router } from 'express';
import shoppingBagRoutes from './shoppingBag.routes';
import authRoutes from './auth.routes';
import recipeRoutes from './recipe.routes';
import categoryRoutes from './category.routes';

const router = Router();

router.use('/shoppingBag', shoppingBagRoutes);
router.use('/auth', authRoutes);
router.use('/recipe', recipeRoutes)
router.use('/category', categoryRoutes)

export default router;