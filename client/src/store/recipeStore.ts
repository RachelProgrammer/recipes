// store/CategoryStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { fetchRecipesAPI, getRecipeAPI } from "../services/recipeService"; // API function
import { Category, Recipe } from "../services/DTOs";

export class RecipeStore {
    //         await removeProductAPI(productId);
    //         this.fetchCategory(); // Refresh list after removing
    //     } catch (err) {
    //         console.error("Failed to remove product:", err);
    //     }
    // }

    recipes: Recipe[] = []; // Observable state
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Action: Fetch shopping bag from API and update state
    async fetchCategory() {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await fetchRecipesAPI();
            runInAction(() => {
                this.recipes = data;
                this.isLoading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message;
                this.isLoading = false;
            });
        }
    }

    async getById(rid: string): Promise<Recipe | undefined> {
        try {
            return await getRecipeAPI(rid);
        } catch (err: any) {
            console.error("Failed to retrieve recipe");
            return undefined;
        }
    }
    // Action: Add a product (simulate an API request and update state)
    // async addProduct(product) {
    //     try {
    //         // Assume `addProductAPI` sends data to backend
    //         await addProductAPI(product);
    //         this.fetchCategory(); // Refresh list after adding
    //     } catch (err) {
    //         console.error("Failed to add product:", err);
    //     }
    // }

    // // Action: Remove a product
    // async removeProduct(productId) {
    //     try {
    //         // Assume `removeProductAPI` deletes item from backend
    //         await removeProductAPI(productId);
    //         this.fetchCategory(); // Refresh list after removing
    //     } catch (err) {
    //         console.error("Failed to remove product:", err);
    //     }
    // }
}

// Export store instance
export const recipeStore = new RecipeStore();