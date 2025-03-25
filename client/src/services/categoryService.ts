import axios from "./axios";
import { Category, Recipe } from "./DTOs";

const BASE_URL = "category";

// services/shoppingService.ts
export async function fetchCategoriesAPI(): Promise<Category[]> {
    const res = await axios.get<Category[]>(`${BASE_URL}/`);
    return res.data;
}

export async function addCategoryAPI(category: Category): Promise<void>{
    await axios.post(`${BASE_URL}/`, category);
}

export async function removeRecipeAPI(rid: any): Promise<void> {
    const response = await axios.delete<Recipe>(`/api/shopping-bag/${rid}`,);
}

export async function getCategoryAPI(cid: any): Promise<Category> {
    const response = await axios.get<Category>(`/api/shopping-bag/${cid}`);
    return response.data;
}

