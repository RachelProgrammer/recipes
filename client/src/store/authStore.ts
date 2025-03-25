import { makeAutoObservable } from "mobx";
import { User } from "../services/DTOs";
import { login, signup } from "../services/authService";

export class AuthStore {
    user?: User;
    token = localStorage.getItem("authToken");
    loading = true;

    constructor() {
        makeAutoObservable(this);
        this.autoLogin();
    }

    async login(username: string, password: string) {
        try {
            const data = await login({ Username: `${username}`, Password: `${password}` });
            this.setUser(data.user, data.token);
        } catch (error: any) {
            console.error("Login Failed:", error.response?.data);
        }
    }

    async autoLogin() {
        if (!this.token) {
            this.loading = false;
            return;
        }

        try {
            const data = await login({ token: this.token });
            this.setUser(data.user, data.token);
        } catch {
            this.logout();
        } finally {
            this.loading = false;
        }
    }

    setUser(user: any, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem("authToken", token);
    }

    async signup(userData: User) {
        try {
            const data = await signup(userData);
            this.setUser(data.user, data.token); // Default to not remembering
        } catch (error: any) {
            console.error("Signup Failed:", error.response?.data);
        }
    }

    logout() {
        this.user = undefined;
        this.token = null;
        localStorage.removeItem("authToken");
    }
}

export const authStore = new AuthStore();
