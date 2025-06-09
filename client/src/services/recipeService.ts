import { Recipe } from "./DTOs";
import axios from "./axios";

const RECIPE = "recipe";

export async function fetchRecipesAPI(): Promise<Recipe[]> {
    const res = await axios.get<Recipe[]>(RECIPE);
    return res.data;
}

export async function getRecipeAPI(rid: string): Promise<Recipe> {
    const res = await axios.get<Recipe>(`${RECIPE}/${rid}`);
    return res.data;
}

export async function addRecipeAPI(recipe: Recipe): Promise<Recipe> {
    const res = await axios.post<Recipe>(RECIPE, recipe);
    return res.data;
}


export async function editRecipeAPI(recipe: Recipe): Promise<Recipe> {
    const res = await axios.post<Recipe>(`${RECIPE}/edit/${recipe._id}`, recipe);
    return res.data;
}

export async function deleteRecipeAPI(rid: string) {
    await axios.delete(`${RECIPE}/delete/${rid}`);
}