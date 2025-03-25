// store/shoppingBagStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { fetchShoppingBagAPI } from "../services/shoppingService"; // API function

export class ShoppingBagStore {
    shoppingBag = []; // Observable state
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Action: Fetch shopping bag from API and update state
    async fetchShoppingBag() {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await fetchShoppingBagAPI();
            runInAction(() => {
                this.shoppingBag = data;
                this.isLoading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message;
                this.isLoading = false;
            });
        }
    }

    // Action: Add a product (simulate an API request and update state)
    // async addProduct(product) {
    //     try {
    //         // Assume `addProductAPI` sends data to backend
    //         await addProductAPI(product);
    //         this.fetchShoppingBag(); // Refresh list after adding
    //     } catch (err) {
    //         console.error("Failed to add product:", err);
    //     }
    // }

    // // Action: Remove a product
    // async removeProduct(productId) {
    //     try {
    //         // Assume `removeProductAPI` deletes item from backend
    //         await removeProductAPI(productId);
    //         this.fetchShoppingBag(); // Refresh list after removing
    //     } catch (err) {
    //         console.error("Failed to remove product:", err);
    //     }
    // }
}

// Export store instance
export const shoppingBagStore = new ShoppingBagStore();
