import { makeAutoObservable } from "mobx";
import { ShoppingBagStore, shoppingBagStore } from "./shoppingBagStore";
import { categoryStore, CategoryStore } from "./categoryStore";
import { recipeStore, RecipeStore } from "./recipeStore";
import { authStore, AuthStore } from "./authStore";

class RootStore {
    category: CategoryStore;
    shoppingBag: ShoppingBagStore;
    recipe: RecipeStore;
    auth: AuthStore;

    constructor() {
        makeAutoObservable(this);

        this.shoppingBag = shoppingBagStore;
        this.category = categoryStore;
        this.recipe = recipeStore;
        this.auth = authStore;
    }
}

const rootStore = new RootStore();
export default rootStore;
