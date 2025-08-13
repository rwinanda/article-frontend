"use client";

import ArticleTopContent from "@/components/admin-component/admin-article/ArticleTopContent";
import CategoryForm from "@/components/admin-component/admin-article/CategoryForm";
import Thumbnails from "@/components/admin-component/admin-article/Thumbnails";
import TitleForm from "@/components/admin-component/admin-article/TitleForm";
import ContentPages from "@/components/admin-component/ContentPages";
import RteEditor from "@/components/admin-component/RteEditor";
import TitlePages from "@/components/admin-component/TitlePages";
import ButtonComponent from "@/components/Button";
import NotifAlert from "@/components/popup/notif/NotifAlert";
import { FormArticles, SchemaArticle } from "@/hooks/zoodForm/SchemaArticle";
import { CreateArticleAPI } from "@/services/articleService";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { UploadAPI } from "@/services/uploadService";
import { ArticlePayload } from "@/types/articleTypes";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const CreateArticlePages = () => {
    const [ImageFile, setImageFile] = useState<(File | null)>(null);
    const [categoryResp, SetCategoryResp] = useState<CategoryResponse>({} as CategoryResponse);
    const [notifError, setNotifError] = useState(false);
    const [loading, setLoading] = useState({
        upload: false,
        preview: false,
        cancel: false
    });
    const router = useRouter()

    const methods = useForm<FormArticles>({
        resolver: zodResolver(SchemaArticle),
        defaultValues: {
            title: "",
            content: "",
            categoryId: "",
            imageUrl: "",
        },
    });

    // Load data for category
    useEffect(() => {
        const categoryParam = {
            page: 1,
            limit: 100,
            search: ""
        } as CategoryParam
        const fetchData = async () => {
            const res = await GetAllCategoryAPI(categoryParam);
            SetCategoryResp(res);
        }

        fetchData()
    }, []);

    // Handler Upload Article to API
    const HandlerAddArticle = async (data: ArticlePayload) => {
        if (!ImageFile) {
            return alert("Please select an image");
        }
        try {
            setLoading((prev) => ({
                ...prev,
                upload: true
            }))
            // 1. Upload pictures using Form Data
            const formData = new FormData();
            formData.append("image", ImageFile);

            const uploadRes = await UploadAPI(formData);
            const payload: ArticlePayload = {
                ...data,
                imageUrl: uploadRes.imageUrl
            }
            await CreateArticleAPI(payload);
            router.push(`/admin/articles`);
            setLoading((prev) => ({
                ...prev,
                upload: false
            }));
        } catch (error) {
            console.error(error);
            setNotifError(true);
        }
    }

    return (
        <div>
            <NotifAlert showNotif={notifError} messageTitle="Error" messageDetail="Something went wrong" />
            <TitlePages title="Articles" />

            {/* Content */}
            <ContentPages>
                {/* Top Content */}
                <ArticleTopContent titleContent="Create Article" />
                {/* Form Content */}
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(HandlerAddArticle)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    >
                        <div className="flex flex-col px-6 py-6">
                            {/* Top Form Content */}
                            <div className="flex flex-col w-full">
                                {/* Thumbnails */}
                                <Thumbnails setImageFile={setImageFile} />

                                {/* Title */}
                                <TitleForm field="title" />

                                {/* Category */}
                                <CategoryForm categoryResp={categoryResp} />
                            </div>

                            {/* Text Editor */}
                            <RteEditor />
                        </div>

                        {/* Bottom Content */}
                        <div className="flex py-4 justify-end px-6">
                            <ButtonComponent type="button" className="border-1 border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-md cursor-pointer" name="Cancel" loading={loading.cancel} />
                            <ButtonComponent type="button" className="bg-slate-200 hover:bg-slate-300 mx-2 px-4 py-2.5 rounded-md cursor-pointer" name="Preview" loading={loading.preview} />
                            <ButtonComponent type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md cursor-pointer" name="Upload" loading={loading.upload} />
                        </div>
                    </form>
                </FormProvider>

            </ContentPages>
        </div >
    )
}

export default CreateArticlePages;