export interface DtoIngredient {
    name: string;
    description: string; // e.g., "1/2", "2"
}

export interface DtoRecipe {
    title: string;
    categoryId: string;
    image: string;
    difficulty: number;
    description: string;
    ingredients: DtoIngredient[];
    instructions: string[];
}