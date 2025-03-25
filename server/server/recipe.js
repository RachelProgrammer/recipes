const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const recipeServer = {
    GetAllRecipe: async (_req, res) => {
        try {
            const recipes = await Recipe.find();
            res.json(recipes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    addRecipy: async (req, res) => {
        try {
            const { Name, UserId, CategoryId, Img, Duration, Difficulty, Description, Ingrident, Instructions } = req.body;

            if (!Name || !UserId || !CategoryId || !Img || !Duration || !Difficulty || !Description || !Ingrident || !Instructions) {
                return res.status(400).send('המידע שנשלח לא תקין');
            }

            const newRecipe = new Recipe({
                Name, UserId, CategoryId, Img, Duration, Difficulty, Description, Ingrident, Instructions
            });

            await newRecipe.save();
            res.json(newRecipe);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    EditRecipy: async (req, res) => {
        try {
            const { Id, Name, UserId, CategoryId, Img, Duration, Difficulty, Description, Ingrident, Instructions } = req.body;

            if (!Id || !Name || !UserId || !CategoryId || !Img || !Duration || !Difficulty || !Description || !Ingrident || !Instructions) {
                return res.status(400).send('המידע שנשלח לא תקין');
            }

            const updatedRecipe = await Recipe.findByIdAndUpdate(
                Id,
                { Name, UserId, CategoryId, Img, Duration, Difficulty, Description, Ingrident, Instructions },
                { new: true }
            );

            if (!updatedRecipe) {
                return res.status(400).send('לא נמצא מתכון מתאים');
            }

            res.json(updatedRecipe);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    Delete: async (req, res) => {
        try {
            const { Id } = req.params;

            const deletedRecipe = await Recipe.findByIdAndDelete(Id);
            if (!deletedRecipe) {
                return res.status(400).send('לא נמצא מתכון למחיקה');
            }

            res.send('ok');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = recipeServer;