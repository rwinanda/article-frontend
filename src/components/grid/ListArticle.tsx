"use client";

import { GetAllArticleAPI } from "@/services/articleService";
import GridCard from "./GridCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PaginationAdmin from "../admin-component/PaginationAdmin";
import { ArticleQuery, ArticleResponse } from "@/types/articleTypes";


interface ListArticleProps {
    articleParam: ArticleQuery
    setArticleParam: Dispatch<SetStateAction<ArticleQuery>>
}

const ListArticle = ({ articleParam, setArticleParam }: ListArticleProps) => {
    const [articleResponse, setArticleResponse] = useState<ArticleResponse>({} as ArticleResponse)

    useEffect(() => {
        const HandlerDataArticle = async () => {
            const res = await GetAllArticleAPI(articleParam);
            setArticleResponse(res)
        }
        HandlerDataArticle();
    }, [articleParam]);

    const onPageArticleChange = (page: number) => {
        setArticleParam({ ...articleParam, page })
    };
    
    const [curPage, setCurPage] = useState(0);
    const pageArticle = Math.min(curPage * articleResponse.limit, articleResponse.total)

    return (
        <section id='work' className='w-full px-[12%] py-10'>
            <p>Showing : {pageArticle} of {articleResponse.total} articles</p>

            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12'>
                {articleResponse.data?.map((data, index) => (
                    <GridCard imageUrl={data.imageUrl} title={data.title} content={data.content} date={data.updatedAt} category={data.category} key={index} articleId={data.id} />
                ))}
            </ul>

            <PaginationAdmin setCurPage={setCurPage} currentPage={articleResponse.page} totalData={articleResponse.total} limitData={articleResponse.limit} onPageChange={onPageArticleChange} />
        </section>
    )
}

export default ListArticle;