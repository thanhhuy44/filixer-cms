import { z } from "zod";

export const ArticleCollectionSchema = z.object({
    name: z.string(),
    description: z.string(),
    thumbnailFile: z
    .instanceof(File) // Ensure it's a File object
    .refine((file) => file.size < 5 * 1024 * 1024, "File must be smaller than 5MB") // Max size 5MB
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), "Only PNG or JPEG allowed"), // Only PNG & JPEG
    thumbnail: z.string().optional()
})

export const AddArticleSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnailFile: z
    .instanceof(File) // Ensure it's a File object
    .refine((file) => file.size < 5 * 1024 * 1024, "File must be smaller than 5MB") // Max size 5MB
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), "Only PNG or JPEG allowed"), // Only PNG & JPEG
    thumbnail: z.string().optional(),
    categories: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    content: z.string().optional(),
})

export type AddArticleBody = z.infer<typeof AddArticleSchema>
export type ArticleCollectionBody = z.infer<typeof ArticleCollectionSchema>