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
    name: string,
    amount:number
};

export type DtoUser = {
    _id: string;
    username: string;
    password: string;
    name: string;
    phone?: string;
    email: string;
}

export type DtoRecipeRef = {
    count : number;
    countDesc: string;
    name: string;
    recipeId: string;
}

export type DtoShoppingBagItem = {
    name: string
    refs: DtoRecipeRef[];
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