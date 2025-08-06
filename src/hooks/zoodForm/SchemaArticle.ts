import z from "zod";

export const SchemaArticle = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter"),
    content: z.string().min(20, "Konten harus lebih panjang"),
    categoryId: z.string().min(1, "Kategori wajib diisi"),
    imageUrl: z.string({ required_error: "Please select an image" })
        .min(1, "Please select an image")
});

// imageUrl: z.string().nonempty("Image is required"),

export type FormArticles = z.infer<typeof SchemaArticle>;