import { CategoryParam, CategoryPayload, CategoryResponse, UpdateCategoryPayload } from "@/types/categoryTypes";
import baseURL from "./base-api/api";
import { TokenAPI } from "@/hooks/TokenAPI";

export const GetAllCategoryAPI = async (categoryParam: CategoryParam): Promise<CategoryResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const queryParam = new URLSearchParams({
            page: categoryParam.page.toString(),
            limit: categoryParam.limit.toString(),
            search: categoryParam.search,
        }).toString();

        const res = await baseURL.get(`/categories?${queryParam.toString()}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return res.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const PostCategoryAPI = async (data: CategoryPayload) => {
    try {
        const token = TokenAPI();

        const res = await baseURL.post("/categories", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const DeleteCategoryAPI = async (id: string) => {
    try {
        const token = TokenAPI();

        const res = await baseURL.delete(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const UpdateCategoryAPI = async (data: UpdateCategoryPayload, id: string) => {
    try {
        const token = TokenAPI()

        const res = await baseURL.put(`/categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}