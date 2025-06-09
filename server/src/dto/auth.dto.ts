export interface DtoSignin {
    username?: string;
    password?: string;
    token?: string;
}

export interface DtoSignup {
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
}