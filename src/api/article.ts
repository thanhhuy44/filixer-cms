import { ApiResponse, QueryParams } from "@/types";
import request from "@/utils/axiosClient";

export const ArticleApi = {
    get: async(params?: QueryParams): Promise<ApiResponse> => {
        return request.get("/articles", {
            params
        })
    },
    delete: async(id: string, params?: QueryParams): Promise<ApiResponse> => {
        return request.delete(`/articles/${id}`, {params})
    },
    collections: async(params?: QueryParams): Promise<ApiResponse> => {
        return request.get("/blog-collections", {
            params
        })
    },
    deleteCollection: async(id: string, params?: QueryParams): Promise<ApiResponse> => {
        return request.delete(`/blog-collections/${id}`, {params})
    },
}