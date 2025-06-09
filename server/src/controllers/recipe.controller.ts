import { Request, RequestHandler, Response } from "express";
import Recipe from '../models/recipe.model';
import { assert } from "console";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { DtoRecipe } from "../dto/recipe.dto";

export const getAllReciepes: RequestHandler = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const recipes = await Recipe.find({ userId }).exec();
        res.json(recipes);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to get recipes" });
    }
}

export const createRecipe: RequestHandler = async (req: AuthenticatedRequest<{ }, {}, DtoRecipe>, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const { title, categoryId, image, difficulty, description, ingredients, instructions } = req.body;

        assert(!!title, "missing 'title'")
        assert(!!categoryId, "missing 'categoryId'")

        const newRecipe = new Recipe({
            title,
            userId: new mongoose.Types.ObjectId(userId),
            categoryId,
            description,
            difficulty,
            image,
            ingredients,
            instructions,
            createdAt: Date.now()
        });
        await newRecipe.save();
        res.json(newRecipe);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to create recipe" });    }
}

export const editRecipe: RequestHandler<{ id: string }> = async (req: Request<{ id: string }, {}, DtoRecipe>, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        assert(id, "missing recipe id");

        const { title, categoryId, image, difficulty, description, ingredients, instructions } = req.body;

        assert(!!title, "missing 'title'")
        assert(!!categoryId, "missing 'categoryId'")

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { 
                title,
                categoryId,
                image,
                difficulty: +difficulty,
                description,
                ingredients,
                instructions,
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!updatedRecipe)
            return res.status(400).send('recipe was not found');

        res.json(updatedRecipe);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to edit recipe" });    }
}

export const getRecipe: RequestHandler<{ id: string }> = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id);
        if (!recipe)
            return res.status(400).send('recipe was not found');
        res.json(recipe);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to get recipe" });
    }
}

export const deleteRecipe: RequestHandler<{ id: string }> = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe)
            return res.status(400).send('no recipe to delete');

        res.send('ok');
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error, message: "Failed to delete recipe" });
    }
}

