import { makeAutoObservable } from "mobx";
import ShoppingBagStore from "./shoppingBagStore";
import CategoryStore from "./categoryStore";
import RecipeStore from "./recipeStore";
import AuthStore from "./authStore";

export class RootStore {
    category: CategoryStore;
    shoppingBag: ShoppingBagStore;
    recipe: RecipeStore;
    auth: AuthStore;

    constructor() {
        makeAutoObservable(this);

        this.shoppingBag = new ShoppingBagStore(this);
        this.category = new CategoryStore(this);
        this.recipe = new RecipeStore(this);
        this.auth = new AuthStore(this);
    }
}

export default new RootStore();