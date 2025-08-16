"use client";

import ArticleTopContent from "@/components/admin-component/admin-article/ArticleTopContent";
import CategoryForm from "@/components/admin-component/admin-article/CategoryForm";
import Thumbnails from "@/components/admin-component/admin-article/Thumbnails";
import TitleForm from "@/components/admin-component/admin-article/TitleForm";
import ContentPages from "@/components/admin-component/ContentPages";
import RteEditor from "@/components/admin-component/RteEditor";
import ButtonComponent from "@/components/Button";
import { GetArticleByIdAPI, UpdateArticleAPI } from "@/services/articleService";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { UploadAPI } from "@/services/uploadService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import { ArticlePayload } from "@/types/articleTypes";
import { FormProvider, useForm } from "react-hook-form";
import { FormArticles, SchemaArticle } from "@/hooks/zoodForm/SchemaArticle";
import { zodResolver } from "@hookform/resolvers/zod";


const UpdateArticlePages = () => {
    const [ImageFile, setImageFile] = useState<(File | null)>(null);
    const [categoryResp, setCategoryResp] = useState<CategoryResponse>({} as CategoryResponse)
    const params = useParams();
    const articleId = params.id as string;
    const [loading, setLoading] = useState({
        upload: false,
        preview: false,
        cancel: false
    });
    const router = useRouter();

    const methods = useForm<FormArticles>({
        resolver: zodResolver(SchemaArticle),
        defaultValues: {
            title: "",
            content: "",
            categoryId: "",
            imageUrl: "",
        },
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        const categoryParam = {
            page: 1,
            limit: 100,
            search: ""
        } as CategoryParam
        const fetchData = async () => {
            const [articles, categories] = await Promise.all([
                GetArticleByIdAPI(articleId),
                GetAllCategoryAPI(categoryParam)
            ]);
            reset({
                title: articles.title,
                content: articles.content,
                categoryId: articles.categoryId,
                imageUrl: articles.imageUrl
            });
            setCategoryResp(categories);
        };

        if (articleId) fetchData();
    }, [articleId, reset]);

    const HandlerUpdate = async (data: ArticlePayload) => {
        let imageUrl = data.imageUrl

        if (!ImageFile) {
            return alert("Please select an image");
        }
        try {
            setLoading((prev) => ({
                ...prev,
                upload: true
            }));

            // 1. Upload pictures using Form Data
            const formData = new FormData();
            formData.append("image", ImageFile);

            const uploadRes = await UploadAPI(formData);
            imageUrl = uploadRes.imageUrl;

            // 2. Upload article using JSON
            const updatePayload: ArticlePayload = {
                ...data,
                imageUrl: imageUrl
            }
            await UpdateArticleAPI(updatePayload, articleId);
            router.push('/admin/articles')
            setLoading((prev) => ({
                ...prev,
                upload: false
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to update article");
        }
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(HandlerUpdate)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                >
                    <ContentPages>
                        <ArticleTopContent titleContent="Update Article" />

                        <div className="flex flex-col px-6 py-6">
                            {/* Top Form Content */}
                            <div className="flex flex-col w-full">
                                {/* Thumbnails */}
                                <Thumbnails setImageFile={setImageFile} />

                                {/* Title */}
                                <TitleForm />

                                {/* Category */}
                                <CategoryForm categoryResp={categoryResp} />
                            </div>

                            <RteEditor />
                        </div>
                    </ContentPages>

                    <div className="flex py-4 justify-end px-6">
                        <ButtonComponent type="button" className="border-1 border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-md cursor-pointer" name="Cancel" loading={loading.cancel} />
                        <ButtonComponent type="button" className="bg-slate-200 hover:bg-slate-300 mx-2 px-4 py-2.5 rounded-md cursor-pointer" name="Preview" loading={loading.preview} />
                        <ButtonComponent type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md cursor-pointer" name="Upload" loading={loading.upload} />
                    </div>
                </form>
            </FormProvider>
        </div >
    )
}

export default UpdateArticlePages;