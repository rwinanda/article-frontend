"use client";

import ArticleTopContent from "@/components/admin-component/admin-article/ArticleTopContent";
import CategoryForm from "@/components/admin-component/admin-article/CategoryForm";
import Thumbnails from "@/components/admin-component/admin-article/Thumbnails";
import TitleForm from "@/components/admin-component/admin-article/TitleForm";
import ContentPages from "@/components/admin-component/ContentPages";
import RteEditor from "@/components/admin-component/RteEditor";
import TitlePages from "@/components/admin-component/TitlePages";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSlate from "@/components/button/ButtonSlate";
import ButtonWhite from "@/components/button/ButtonWhite";
import AlertModal from "@/components/modal/AlertModal";
import PreviewModal from "@/components/modal/PreviewModal";
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
    const [notifError, setNotifError] = useState({
        errorCreate: false,
        imageEmpty: false
    });
    const [loading, setLoading] = useState({
        upload: false,
        preview: false,
        cancel: false
    });
    const router = useRouter();
    const [previewArticle, setPreviewArticle] = useState<FormArticles | null>(null)
    const [showPreview, setShowPreview] = useState(false);
    const [cancelPage, setCancelPage] = useState(false);
    const [categoryName, setCategoryName] = useState("");

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

    const HandlerCancelPage = () => {
        router.push("/admin/articles")
    }

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
            const res = await CreateArticleAPI(payload);
            console.log("respon => ", res)
            router.push(`/admin/articles`);
            setLoading((prev) => ({
                ...prev,
                upload: false
            }));
        } catch (error) {
            console.error(error);
            setNotifError((prev) => ({
                ...prev,
                errorCreate: true
            }));
        }
    }

    return (
        <div>
            <NotifAlert showNotif={notifError.errorCreate} messageTitle="Error" messageDetail="Something went wrong" />
            <NotifAlert showNotif={notifError.imageEmpty} messageTitle="Error" messageDetail="Please select an image" />
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
                                <Thumbnails setImageFile={setImageFile} />
                                <TitleForm />
                                <CategoryForm categoryResp={categoryResp} setCategoryName={setCategoryName} />
                            </div>

                            {/* Text Editor */}
                            <RteEditor />
                        </div>

                        {/* Bottom Content */}
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

export default CreateArticlePages;