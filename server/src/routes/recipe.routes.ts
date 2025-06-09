import { Router } from 'express';
import { createRecipe, deleteRecipe, editRecipe, getAllReciepes as getAllRecipes, getRecipe } from '../controllers/recipe.controller';

const router = Router();

router.get('/', getAllRecipes);
router.post('/', createRecipe);
router.get('/:id', getRecipe);
router.post('/edit/:id', editRecipe);
router.delete('/delete/:id', deleteRecipe);

export default router;