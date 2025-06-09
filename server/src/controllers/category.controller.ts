import { Request, RequestHandler, Response } from 'express';
import Category from '../models/category.model'; // Import the Category model
import { assert } from 'console';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import mongoose from 'mongoose';

export const getAllCategories: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const categories = await Category.find({ userId }).exec();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error, message: 'Error fetching categories' });
    }
}


export const createCategory: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { name } = req.body;
    const userId = req.userId;

    assert(name, "missing 'name'");

    try {
        const existingCategory = await Category.findOne({ name }).exec();
        if (existingCategory) return res.status(400).send('category already exists');

        const newCategory = new Category({ name, userId: new mongoose.Types.ObjectId(userId) });
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).send('error adding category');
    }
}


export const editCategory: RequestHandler<{ id: string }> = async (req: Request<{ id: string }, {}, { name: string}>, res: Response): Promise<void> => {
    const { id } = req.params;
    assert(id, "missing recipe id"); 
    
    const { name } = req.body;
    assert(name, "missing 'name'");

    try {
        const updated = await Category.findByIdAndUpdate(id, { name });
        res.send(updated);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error, message: 'Failed to add category' });
    }
}

export const deleteCategory: RequestHandler<{ id: string }> = async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    const { id } = req.params;
    assert(id, "missing recipe id"); 

    try {
        const deletedCategory = await Category.findByIdAndDelete(id).exec();
        if (!deletedCategory) res.status(404).json({ error: 'Category not found' });

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error, message: 'Failed to delete category'});
    }
}