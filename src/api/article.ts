/* eslint-disable @typescript-eslint/no-explicit-any */

import { AddArticleBody } from "@/lib/validations/article-schemas";
import { ApiResponse, QueryParams } from "@/types";
import request from "@/utils/axiosClient";

export const ArticleApi = {
    create: async(body: AddArticleBody): Promise<ApiResponse> => {
        return request.post("/articles", body)},
    get: async(params?: QueryParams): Promise<ApiResponse> => {
        return request.get("/articles", {
            params
        })
    },
    update: async (id: string, body: {
        [key: string]: any
    }): Promise<ApiResponse> => {
        return await request.patch(`/articles/${id}`, body) 
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
    categories:  async(params?: QueryParams): Promise<ApiResponse> => {
        return request.get("/categories", {
            params
        })
    },
}