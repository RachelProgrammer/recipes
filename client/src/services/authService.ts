import axios from "./axios";
import { User } from "./DTOs";

const API_BASE_URL = "user";

type DtoAuth = {
    user: User;
    token: string;
}
export async function login(data: any) {
    const res = await axios.post<DtoAuth>(`${API_BASE_URL}/login`, data);
    return res.data;
    // Returns user data + token
}

export async function signup(user: User) {
    const res = await axios.post<DtoAuth>(`${API_BASE_URL}/signup`, user);
    return res.data;
    // Returns user data + token
}

export async function logout() {
    // await axios.post(`${API_BASE_URL}/logout`);
}
