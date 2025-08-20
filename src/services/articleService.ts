import baseURL from "./base-api/api"
import { ArticlePayload, ArticlePayResp, ArticleQuery, ArticleResponse } from "@/types/articleTypes";
import { TokenAPI } from "@/hooks/TokenAPI";
import { ArticleDetailResp } from "@/types/articleDetailTypes";


export const GetAllArticleAPI = async (articleParam: ArticleQuery): Promise<ArticleResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
        const articleQuery = new URLSearchParams({
            page: articleParam.page.toString(),
            limit: articleParam.limit.toString(),
            title: articleParam.title.toString(),
            category: articleParam?.category?.toString(),
            sortBy: "createdAt",
            sortOrder: "desc"
        }).toString();
        const res = await baseURL.get(`/articles?${articleQuery}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const GetArticleByIdAPI = async (id: string): Promise<ArticleDetailResp> => {
    try {
        const res = await baseURL.get(`/articles/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const CreateArticleAPI = async (data: ArticlePayload): Promise<ArticlePayResp> => {
    try {
        const token = TokenAPI();
        const res = await baseURL.post("/articles", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("respon post article => ", res.data)
        return res.data
    } catch (error) {
        console.error(error);;
        throw error;
    }
}

export const DeleteArticleAPI = async (id: string) => {
    try {
        const token = TokenAPI();
        const res = await baseURL.delete(`/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const UpdateArticleAPI = async (data: ArticlePayload, id: string): Promise<ArticlePayResp> => {
    try {
        const token = TokenAPI();
        const res = await baseURL.put(`/articles/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Update Article => ", res.data)
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}