import axios from "./axios";
import { DtoCategory } from "./DTOs";

const CATEGORY = "category";

export async function fetchCategoriesAPI(): Promise<DtoCategory[]> {
    const res = await axios.get<DtoCategory[]>(CATEGORY);
    return res.data;
}

export async function addCategoryAPI(categoryName: string): Promise<DtoCategory> {
    const res = await axios.post(CATEGORY, { name: categoryName });
    return res.data;
}

export async function editCategoryAPI(id: string, name: string): Promise<DtoCategory> {
    const res = await axios.post(`${CATEGORY}/edit/${id}`, { name: name });
    return res.data;
}

export async function deleteCategoryAPI(id: string): Promise<boolean> {
    const res = await axios.delete(`${CATEGORY}/delete/${id}`);
    return res.data;
}