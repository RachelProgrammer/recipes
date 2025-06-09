import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './utils/db';

const port = process.env.PORT || 8080;

connectDB();

app.listen(port, () => {
    console.log(`[RecipeBook] App running on port ${port}`);
});