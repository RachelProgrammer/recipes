import { Router } from 'express';
import { createCategory, deleteCategory, editCategory, getAllCategories } from '../controllers/category.controller';

const router = Router();

router.get('/', getAllCategories)
router.post('/', createCategory);
router.post('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);

export default router;