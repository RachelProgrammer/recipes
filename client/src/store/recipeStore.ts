import { makeAutoObservable, runInAction } from "mobx";
import { addRecipeAPI, deleteRecipeAPI, editRecipeAPI, fetchRecipesAPI, getRecipeAPI } from "../services/recipeService"; // API function
import { Recipe } from "../services/DTOs";
import { RootStore } from "./store";

export default class RecipeStore {
    recipes: Recipe[] = [];
    isLoading = false;
    error = null;

    constructor(readonly owner: RootStore) {
        makeAutoObservable(this);
    }

    async fetchAll() {
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

    async addRecipe(recipe: Recipe): Promise<Recipe | undefined> {
        try {
            const res = await addRecipeAPI(recipe);
            await this.fetchAll();
            return res;
        } catch (err: any) {
            console.error("Failed to add recipe");
            return undefined;
        }
    }

    async editRecipe(recipe: Recipe): Promise<Recipe | undefined> {
        try {
            const res = await editRecipeAPI(recipe);
            await this.fetchAll();
            return res;
        } catch (err: any) {
            console.error("Failed to edit recipe");
            return undefined;
        }
    }


    async deleteRecipe(recipeId: string): Promise<void> {
        try {
            const res = await deleteRecipeAPI(recipeId);
            await this.fetchAll();
            return res;
        } catch (err: any) {
            console.error("Failed to edit recipe");
            return undefined;
        }
    }
}