const Category = require('../models/category'); // Import the Category model
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

const categoryServer = {
    // 🔹 Get all categories
    GetAllCategory: async (req, res) => {
        try {
            const categories = await Category.find(); // Fetch all categories from the database
            res.send(categories);
        } catch (error) {
            res.status(500).send('Error fetching categories');
        }
    },

    // 🔹 Add a new category
    addCategory: async (req, res) => {
        const { Name } = req.body;

        if (!Name) {
            return res.status(400).send('לא נשלח שם לקטגוריה');
        }

        try {
            // Check if the category already exists
            const existingCategory = await Category.findOne({ Name });
            if (existingCategory) {
                return res.status(400).send('קטגוריה קיימת');
            }

            // Find the last category to determine the new ID
            const lastCategory = await Category.findOne().sort({ Id: -1 });
            const newId = lastCategory ? lastCategory.Id + 1 : 1; // Increment Id or start from 1

            const newCategory = new Category({
                Name,
                Id: newId
            });

            await newCategory.save(); // Save the new category to MongoDB
            res.send(newCategory);
        } catch (error) {
            res.status(500).send('Error adding category');
        }
    }
};

module.exports = categoryServer;
