import { makeAutoObservable, runInAction } from "mobx";
import { addAllItemsToCart, addItemToCart, deleteCartAPI, fetchShoppingListAPI, removeItemFromCart } from "../services/shoppingService";
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

    async addAllIngredients(recipeId: string) {
        try {
            await addAllItemsToCart(recipeId);
            this.fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    async addIngredient(name: string, recipeId: string, count: number) {
        try {
            await addItemToCart(name, recipeId, count);
            this.fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    async removeIngredient(name: string, recipeId: string, count: number) {
        try {
            await removeItemFromCart(name, recipeId, count);
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