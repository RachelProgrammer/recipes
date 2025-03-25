import axios from "./axios";
import { User } from "./DTOs";

type DtoAuth = {
    user: User;
    token: string;
}

export async function login(data: any): Promise<DtoAuth> {
    const res = await axios.post<DtoAuth>(`auth/login`, data);
    return res.data;
}

export async function signup(user: User): Promise<DtoAuth> {
    const res = await axios.post<DtoAuth>(`auth/signup`, user);
    return res.data;
}

export async function logout() {
    // await axios.post(`${API_BASE_URL}/logout`);
}
