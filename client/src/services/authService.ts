import axios from "./axios";
import { DtoAuth, DtoSignin, DtoSignup } from "./DTOs";

const AUTH = "auth";

export async function signInAPI(data: DtoSignin): Promise<DtoAuth> {
    const res = await axios.post<DtoAuth>(`${AUTH}/signin`, data);
    return res.data;
}

export async function signupAPI(data: DtoSignup): Promise<DtoAuth> {
    const res = await axios.post<DtoAuth>(`${AUTH}/signup`, data);
    return res.data;
}