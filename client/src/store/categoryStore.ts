// store/CategoryStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { fetchCategoriesAPI, getCategoryAPI } from "../services/categoryService"; // API function
import { Category } from "../services/DTOs";

export class CategoryStore {

    categories: Category[] = []; // Observable state
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
            const data = await fetchCategoriesAPI();
            runInAction(() => {
                this.categories = data;
                this.isLoading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message;
                this.isLoading = false;
            });
        }
    }

    add(categoryName: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }


    async getById(rid: string): Promise<Category | undefined> {
        try {
            return await getCategoryAPI(rid);
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
export const categoryStore = new CategoryStore();