"use client";

import AddNavigate from "@/components/AddNavigate"
import ContentPages from "@/components/admin-component/ContentPages"
import PaginationAdmin from "@/components/admin-component/PaginationAdmin"
import Search from "@/components/admin-component/Search"
import TableNotFound from "@/components/admin-component/TableNotFound";
import TitlePages from "@/components/admin-component/TitlePages"
import TopContent from "@/components/admin-component/TopContent"
import SkeletonArticle from "@/components/loading/loading-skeleton/SkeletonArticle";
import AlertModal from "@/components/popup/AlertModal";
import NotifAlert from "@/components/popup/notif/NotifAlert";
import SelectCategory from "@/components/select/SelectCategory";
import { HandlerDateFormat } from "@/hooks/HandlerDateFormat";
import { DeleteArticleAPI, GetAllArticleAPI } from "@/services/articleService";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { ArticleQuery, ArticleResponse } from "@/types/articleTypes";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ArticlePage = () => {
    const labelHeaders = ["Thumbnails", "Title", "Category", "Created At", "Action"];
    const [openModalDel, setOpenModalDel] = useState(false);
    const [articleResp, setArticleResp] = useState<ArticleResponse>({} as ArticleResponse);
    const [selectedData, setSelectedData] = useState("");
    const [categoryResp, setCategoryResp] = useState<CategoryResponse>({} as CategoryResponse);
    const [searchTerm, setSearchTerm] = useState("");
    const [articleParam, setArticleParam] = useState<ArticleQuery>({
        page: 1,
        limit: 10,
        title: "",
        category: ""
    });
    const [loadingState, setLoadingState] = useState({
        button: false,
        skeleton: false
    });
    const [showNotif, setShowNotif] = useState(false);

    const refreshPage = async () => {
        const res = await GetAllArticleAPI(articleParam);
        setArticleResp(res);
    };

    const deleteArticle = async (id: string) => {
        try {
            await DeleteArticleAPI(id);
            await refreshPage()
            setOpenModalDel(false);
            setShowNotif(true);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const onPageArticleChange = (page: number) => {
        setArticleParam({ ...articleParam, page })
    };

    // Debounce for search
    useEffect(() => {
        const handler = setTimeout(() => {
            setArticleParam((prev) => ({
                ...prev,
                title: searchTerm,
                page: 1,
            }));
        }, 500); // 800ms debounce

        return () => clearTimeout(handler)
    }, [searchTerm]);

    useEffect(() => {
        const categoryParam = {
            page: 1,
            limit: 100,
            search: ""
        } as CategoryParam;

        const fetchData = async () => {
            // Loading State Skeleton
            setLoadingState((prev) => ({
                ...prev,
                skeleton: true
            }));

            // Call API
            const [articles, categories] = await Promise.all([
                GetAllArticleAPI(articleParam),
                GetAllCategoryAPI(categoryParam)
            ]);

            // Set State
            setArticleResp(articles);
            setCategoryResp(categories);
            setLoadingState((prev) => ({
                ...prev,
                skeleton: false
            }));
        }

        fetchData();
    }, [articleParam]);

    return (
        <div>
            <div className="flex justify-end">
                <NotifAlert showNotif={showNotif} messageTitle="Success" messageDetail="Article Has been Deleted" />
            </div>
            <TitlePages title="Articles" />
            <ContentPages >
                <TopContent text={`Total Article: ${articleResp.total}`} />

                {/* Filter */}
                <div className="flex p-6 border-b-1 border-slate-200">
                    <div className="flex">
                        {/* Category */}
                        <SelectCategory categoryArray={categoryResp} setArticleParam={setArticleParam} />

                        {/* Search */}
                        <Search placeholder="Searh by title" value={searchTerm} onChange={setSearchTerm} />
                    </div>

                    <AddNavigate href="/admin/articles/create" nameAdd="+ Add Articles" />
                </div>

                {/* Table Article */}
                {loadingState.skeleton ? (
                    <SkeletonArticle />
                ) : articleResp.data?.length === 0 ? (
                    <TableNotFound />
                ) :
                    <div className="flex flex-col">
                        {/* Header Table */}
                        <div className="grid grid-cols-5 w-full items-center text-center bg-gray-100 py-3 transition duration-300 ease-in-out">
                            {labelHeaders.map((label, index) => (
                                <label key={index}>
                                    {label}
                                </label>
                            ))}
                        </div>

                        {/* Data Table */}
                        {articleResp.data?.map((article, index) => {
                            const rawDate = article?.updatedAt;
                            const newDate = HandlerDateFormat(rawDate);
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-5 w-full items-center py-3 border-1 border-slate-200 transition duration-300 ease-in-out hover:bg-gray-100">
                                    <div className="flex justify-center items-center">
                                        <div className="w-16 h-16 relative">
                                            {
                                                !article.imageUrl ?
                                                    <Image
                                                        src="/images/image-not-available.jpg"
                                                        alt="image-not-available"
                                                        fill
                                                        className='object-cover border-gray-400 rounded-xl'
                                                    /> :
                                                    <Image
                                                        src={article.imageUrl}
                                                        alt={`${article.title}-thumbnails`}
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover rounded-md"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                            }
                                        </div>
                                    </div>
                                    <label className="mx-4 my-3 line-clamp-2">
                                        {article?.title}
                                    </label>
                                    <label className="text-center">
                                        {article?.category?.name}
                                    </label>
                                    <label className="text-center">
                                        {newDate}
                                    </label>
                                    <div className="flex justify-center">
                                        <a href={`/article/${article?.id}`} className="text-blue-600 underline hover:scale-110">Preview</a>
                                        <Link href={`/admin/articles/update/${article?.id}`} className="mx-3 text-blue-600 underline hover:scale-110">
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-500 underline hover:scale-110"
                                            onClick={() => {
                                                setSelectedData(article.id)
                                                setOpenModalDel(true)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        <AlertModal nameModal="Delete Articles" textModal="Deleting this article is permanent and cannot be undone. All related content will be removed." nameButton="Delete" openModal={openModalDel} closeModal={() => setOpenModalDel(false)} handler={() => deleteArticle(selectedData)} bgColor="bg-red-600 hover:bg-red-700" />
                    </div>
                }

                <PaginationAdmin currentPage={articleResp.page} totalData={articleResp.total} limitData={articleResp.limit} onPageChange={onPageArticleChange} />
            </ContentPages>
        </div>
    )
}

export default ArticlePage