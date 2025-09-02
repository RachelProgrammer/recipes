import { makeAutoObservable, runInAction } from "mobx";
import { addCategoryAPI, deleteCategoryAPI, editCategoryAPI, fetchCategoriesAPI } from "../services/categoryService"; // API function
import { DtoCategory } from "../services/DTOs";
import { RootStore } from "./store";

export default class CategoryStore {
    categories: DtoCategory[] = [];
    isLoading = false;
    error = null;

    constructor(readonly owner: RootStore) {
        makeAutoObservable(this);
    }

    async fetchAll() {
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

    async add(categoryName: string): Promise<DtoCategory | undefined> {
        try {
            const category = await addCategoryAPI(categoryName);
            await this.fetchAll();
            return category;
        } catch (err: any) {
            console.error(err.response.data);
            throw err;
        }
    }

    async edit(id: string, name: string): Promise<DtoCategory | undefined> {
        try {
            const category = await editCategoryAPI(id, name);
            await this.fetchAll();
            return category;
        } catch (err: any) {
            console.error(err.response.data);
            throw err;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const category = await deleteCategoryAPI(id);
            await this.fetchAll();
            return category;
        } catch (err: any) {
            console.error(err.response.data);
            throw err;
        }
    }
}
