import { makeAutoObservable } from "mobx";
import { DtoAuth, DtoSignin, DtoSignup, DtoUser } from "../services/DTOs";
import { signInAPI, signupAPI as signUp } from "../services/authService";
import { RootStore } from "./store";

export default class AuthStore {
    user?: DtoUser;
    token = localStorage.getItem("authToken");
    loading = true;

    constructor(readonly owner: RootStore) {
        makeAutoObservable(this);
        this.autoSignIn();
    }

    async signIn(dtoUser: DtoSignin) {
        try {
            const dtoAuth = await signInAPI(dtoUser);
            this.initializeUser(dtoAuth);
        } catch (error: any) {
            console.error("Signin Failed:", error.response?.data);
            throw error;
        }
    }

    async autoSignIn() {
        if (!this.token) {
            this.loading = false;
            return;
        }

        try {
            const dtoAuth = await signInAPI({ token: this.token });
            this.initializeUser(dtoAuth);
        } catch {
            this.signOut();
        } finally {
            this.loading = false;
        }
    }

    initializeUser(data: DtoAuth) {
        this.user = data.user;
        this.token = data.token;
        localStorage.setItem("authToken", data.token);

        this.owner.category.fetchAll();
        this.owner.recipe.fetchAll();
        this.owner.shoppingBag.fetchAll();
    }

    async signUp(userData: DtoSignup) {
        try {
            const dtoAuth = await signUp(userData);
            this.initializeUser(dtoAuth);
        } catch (error: any) {
            console.error("Signup Failed:", error.response?.data);
            throw error;
        }
    }

    signOut() {
        this.user = undefined;
        this.token = null;
        localStorage.removeItem("authToken");
    }
}