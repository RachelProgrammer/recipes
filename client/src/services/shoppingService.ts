import axios from "./axios";
import { DtoShoppingBag } from "./DTOs";

const SHOPPING_BAG = "shoppingBag";

export async function fetchShoppingListAPI(): Promise<DtoShoppingBag> {
    const res = await axios.get<DtoShoppingBag>(SHOPPING_BAG);
    return res.data;
}

export async function addProductAPI(name: string, recipeId: string): Promise<any> {
    const res = await axios.post<any>(SHOPPING_BAG, { name, recipeId });
    return res.data;
}

export async function deleteCartAPI(): Promise<any> {
    const res = await axios.delete<any>(SHOPPING_BAG);
    return res.data;
}

export async function deleteProductAPI(productId: string): Promise<any> {
    const res = await axios.delete<any>(`${SHOPPING_BAG}/${productId}`);
    return res.data;
}
