
export interface DtoItemRef {
    recipeId: string;
    name: string;
    countDesc: string;
    count: number;
}

export interface DtoItem {
    name: string;
    refs: DtoItemRef[];
}

export interface ShoppingBagDto {
    userId: string;
    items: DtoItem[];
}

export interface ItemResultRefDto {
    recipeId: string;
    name: string;
    countDesc: string;
    count: number;
}

export interface ItemResultDto {
    name: string;
    refs?: ItemResultRefDto[];
}

export interface ShoppingBagResultDto {
    userId: string,
    items: ItemResultDto[];
}