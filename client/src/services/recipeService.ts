import { Recipe } from "./DTOs";
import axios from "./axios";

// services/shoppingService.ts
export async function fetchRecipesAPI() {
    const response = await fetch("/api/shopping-bag");
    if (!response.ok) throw new Error("Failed to fetch shopping bag");
    return await response.json();
}

export async function addRecipeAPI(product: any) {
    const response = await fetch("/api/shopping-bag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to add product");
}

export async function removeRecipeAPI(productId: any) {
    const response = await fetch(`/api/shopping-bag/${productId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove product");
}


export async function getRecipeAPI(rid: string): Promise<Recipe> {
    const response = await axios.get<Recipe>(`/api/shopping-bag/${rid}`);
    return response.data;
}