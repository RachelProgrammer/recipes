import { makeAutoObservable, runInAction } from "mobx";
import { addProductAPI, deleteCartAPI, deleteProductAPI, fetchShoppingListAPI } from "../services/shoppingService"; // API function
import { RootStore } from "./store";
import { DtoShoppingBagItem } from "../services/DTOs";

export default class ShoppingBagStore {
    shoppingBagItems: DtoShoppingBagItem[] = [];
    isLoading = false;
    error = null;

    constructor(readonly owner: RootStore) {
        makeAutoObservable(this);
    }

    async fetchAll() {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await fetchShoppingListAPI();
            runInAction(() => {
                this.shoppingBagItems = data.items ?? [];
                this.isLoading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message;
                this.isLoading = false;
            });
        }
    }

    async addIngredient(name: string, recipeId: string) {
        try {
            await addProductAPI(name, recipeId);
            this.fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    async removeIngredient(itemId: string) {
        try {
            await deleteProductAPI(itemId);
            await this.fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    async removeAll() {
        try {
            await deleteCartAPI();
            await this.fetchAll();
        } catch (err) {
            console.error(err);
        }
    }
}