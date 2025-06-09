export type DtoCategory = { _id: string, name: string };
export type Recipe = {
    _id: string,
    title: string,
    userId: string,
    categoryId: string,
    image: any,
    difficulty: number,
    description: string,
    ingredients: Ingrident[],
    instructions: string[]
};
export type Ingrident = {
    description: string,
    name: string
};

export type DtoUser = {
    _id: string;
    username: string;
    password: string;
    name: string;
    phone?: string;
    email: string;
}

export type DtoShoppingBagItem = {
    isBought: boolean
    name: string
    recipeId: string;
    _id: string;
}

export type DtoShoppingBag = {
    _id: string;
    items: DtoShoppingBagItem[];
}

export type DtoSignin = {
    username?: string;
    password?: string;
    token?: string;
}


export type DtoSignup = {
    username: string;
    password: string;
    name: string;
    phone?: string;
    email: string;
}

export type DtoAuth = {
    token: string;
    user: DtoUser
}