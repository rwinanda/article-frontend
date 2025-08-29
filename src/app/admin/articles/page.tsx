"use client";

import AddNavigate from "@/components/AddNavigate"
import ContentPages from "@/components/admin-component/ContentPages"
import PaginationAdmin from "@/components/admin-component/PaginationAdmin"
import Search from "@/components/admin-component/Search"
import TableAdminArticle from "@/components/admin-component/table-admin/TableAdminArticle";
import TableNotFound from "@/components/admin-component/TableNotFound";
import TitlePages from "@/components/admin-component/TitlePages"
import TopContent from "@/components/admin-component/TopContent"
import SkeletonArticle from "@/components/loading/loading-skeleton/SkeletonArticle";
import AlertModal from "@/components/modal/AlertModal";
import NotifAlert from "@/components/popup/notif/NotifAlert";
import SelectCategory from "@/components/select/SelectCategory";
import { DebounceSearch } from "@/hooks/DebounceSearch";
import { DeleteArticleAPI, GetAllArticleAPI } from "@/services/articleService";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { ArticleQuery, ArticleResponse } from "@/types/articleTypes";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import { useEffect, useState } from "react";

const ArticlePage = () => {
    const [openModalDel, setOpenModalDel] = useState(false);
    const [articleResp, setArticleResp] = useState<ArticleResponse>({} as ArticleResponse);
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
    const [selectedData, setSelectedData] = useState("");


    const refreshPage = async () => {
        const res = await GetAllArticleAPI(articleParam);
        setArticleResp(res);
    };

    const deleteArticle = async (id: string) => {
        try {
            await DeleteArticleAPI(id);
            await refreshPage()
            setOpenModalDel(false);
            setShowNotif(false);
            setTimeout(() => setShowNotif(true), 10);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const onPageArticleChange = (page: number) => {
        setArticleParam({ ...articleParam, page })
    };

    // Searching
    DebounceSearch(searchTerm, setArticleParam);

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
                    <TableAdminArticle articleResp={articleResp} setOpenModalDel={setOpenModalDel} setSelectedData={setSelectedData} />
                }
                <AlertModal nameModal="Delete Articles" textModal="Deleting this article is permanent and cannot be undone. All related content will be removed." nameButton="Delete" openModal={openModalDel} closeModal={() => setOpenModalDel(false)} handler={() => deleteArticle(selectedData)} />

                <PaginationAdmin currentPage={articleResp.page} totalData={articleResp.total} limitData={articleResp.limit} onPageChange={onPageArticleChange} />
            </ContentPages>
        </div>
    )
}

export default ArticlePage