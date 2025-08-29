"use client";

import ArticleTopContent from "@/components/admin-component/admin-article/ArticleTopContent";
import CategoryForm from "@/components/admin-component/admin-article/CategoryForm";
import Thumbnails from "@/components/admin-component/admin-article/Thumbnails";
import TitleForm from "@/components/admin-component/admin-article/TitleForm";
import ContentPages from "@/components/admin-component/ContentPages";
import RteEditor from "@/components/admin-component/RteEditor";
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
import ButtonWhite from "@/components/button/ButtonWhite";
import ButtonSlate from "@/components/button/ButtonSlate";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import NotifAlert from "@/components/popup/notif/NotifAlert";
import PreviewModal from "@/components/modal/PreviewModal";
import AlertModal from "@/components/modal/AlertModal";


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
    const [notifError, setNotifError] = useState({
        errorCreate: false,
        imageEmpty: false
    });
    const [previewArticle, setPreviewArticle] = useState<FormArticles | null>(null)
    const [showPreview, setShowPreview] = useState(false);
    const [cancelPage, setCancelPage] = useState(false);
    const [categoryName, setCategoryName] = useState("");

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

    const HandlerPreviewPage = () => {
        const data = methods.getValues()

        // Condition when no image file
        if (!ImageFile && !data.imageUrl) {
            setNotifError((prev) => ({
                ...prev,
                imageEmpty: false
            }))
            setTimeout(() => setNotifError((prev) => ({
                ...prev,
                imageEmpty: true
            })), 10);
            return;
        }

        setPreviewArticle({
            ...data,
            imageUrl: ImageFile ? URL.createObjectURL(ImageFile) : data.imageUrl,
        });
        setShowPreview(true);
    }

    const HandlerCancelPage = () => {
        router.push("/admin/articles")
    }

    const HandlerUpdate = async (data: ArticlePayload) => {
        let imageUrl = data.imageUrl

        try {
            setLoading((prev) => ({
                ...prev,
                upload: true
            }));

            if (ImageFile) {
                const formData = new FormData();
                formData.append("image", ImageFile);
                const uploadRes = await UploadAPI(formData);
                imageUrl = uploadRes.imageUrl;
            }

            // 2. Upload article using JSON
            const updatePayload: ArticlePayload = {
                ...data,
                imageUrl: imageUrl
            }
            await UpdateArticleAPI(updatePayload, articleId);
            router.push('/admin/articles')
        } catch (error) {
            console.error(error);
            alert("Failed to update article");
        } finally {
            setLoading((prev) => ({
                ...prev,
                upload: false
            }));
        }
    }


    return (
        <div>
            <NotifAlert showNotif={notifError.errorCreate} messageTitle="Error" messageDetail="Something went wrong" />
            <NotifAlert showNotif={notifError.imageEmpty} messageTitle="Error" messageDetail="Please select an image" />
            <ContentPages>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(HandlerUpdate)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    >
                        <ArticleTopContent titleContent="Update Article" />

                        <div className="flex flex-col px-6 py-6">
                            {/* Top Form Content */}
                            <div className="flex flex-col w-full">
                                {/* Thumbnails */}
                                <Thumbnails setImageFile={setImageFile} />

                                {/* Title */}
                                <TitleForm />

                                {/* Category */}
                                <CategoryForm categoryResp={categoryResp} setCategoryName={setCategoryName} />
                            </div>

                            <RteEditor />
                        </div>
                        <div className="flex py-4 gap-2 justify-end px-6">
                            <ButtonWhite type="button" text="Cancel" loading={loading.cancel}
                                onClick={() => setCancelPage(true)}
                            />
                            <ButtonSlate type="button" text="Preview" loading={loading.preview}
                                onClick={() =>
                                    HandlerPreviewPage()
                                }
                            />
                            <ButtonPrimary type="submit" text="Upload" loading={loading.upload} sizeBtn="px-4" />
                        </div>
                    </form>
                </FormProvider>
                <PreviewModal
                    open={showPreview}
                    closeModal={() => setShowPreview(false)}
                    data={previewArticle}
                    category={categoryName}
                />
                <AlertModal nameModal="Cancel Page" textModal="Are you sure you want to cancel your changes? Any unsaved data will be lost." nameButton="Ok" openModal={cancelPage} closeModal={() => setCancelPage(false)} handler={HandlerCancelPage} />
            </ContentPages>

        </div >
    )
}

export default UpdateArticlePages;