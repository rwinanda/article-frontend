"use client";

import GridCard from '@/components/grid/GridCard'
import SkeletonImage from '@/components/loading/loading-skeleton/SkeletonImage';
import Navbar from '@/components/Navbar';
import { setNavbarBgScroll } from '@/redux/features/navbar/navbarSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { GetAllArticleAPI, GetArticleByIdAPI } from '@/services/articleService';
import { ArticleDetailResp } from '@/types/articleDetailTypes';
import { ArticleQuery, ArticleResponse } from '@/types/articleTypes';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailArticleById = () => {

    const [detailArticle, setDetailArticle] = useState<ArticleDetailResp>({} as ArticleDetailResp);
    const [articleResponse, setArticleResponse] = useState<ArticleResponse>({} as ArticleResponse);
    const [articleParam, setArticleParam] = useState<ArticleQuery>({
        page: 1,
        limit: 10,
        title: "",
        category: ""
    });

    const params = useParams();
    const articleId = params.id as string;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavbarBgScroll(({
            navbar: "bg-white shadow-sm",
            fontColor: "text-black",
            logoImage: "/images/logoipsum.png"
        })));
    }, [dispatch]);

    // Get Article by Id
    useEffect(() => {
        const handlerDetailArticle = async () => {
            const res = await GetArticleByIdAPI(articleId)
            setDetailArticle(res)
            setArticleParam((prev) => ({
                ...prev,
                category: res.categoryId
            }));
        };
        handlerDetailArticle();
    }, [articleId]);

    // Get Other Article with a same categorys
    useEffect(() => {
        const HandlerDataArticle = async () => {
            const res = await GetAllArticleAPI(articleParam);
            const filteredArticles = res.data.filter(article => article.id != articleId)
            setArticleResponse((prev) => ({
                ...prev,
                data: filteredArticles
            }));
        };

        if (articleParam.category) {
            HandlerDataArticle();
        };
    }, [articleParam, articleId]);



    return (
        <div className='flex flex-col'>
            {/* Header */}
            <Navbar />

            <div className='px-40 py-10 mt-32'>
                <div className='flex gap-4 justify-center'>
                    <p>{detailArticle.updatedAt}</p>
                    <p>•</p>
                    <p>Created by {detailArticle.user?.username}</p>
                </div>
                <h1 className='text-center text-xl font-semibold mt-3'>{detailArticle.title}</h1>
                {
                    detailArticle?.imageUrl ? (
                        <Image
                            src={detailArticle?.imageUrl}
                            alt={detailArticle?.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '480px' }}
                            className="object-cover border-gray-400 rounded-xl mt-10"
                        />
                    ) :
                        <SkeletonImage />
                }
                <div
                    className='prose mt-10'
                    dangerouslySetInnerHTML={{ __html: detailArticle.content }}
                >
                </div>

                <div className='pt-20 px-6'>
                    <p className='font-semibold'>Other articles</p>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12'>
                        {
                            articleResponse.data?.slice(0, 3).map((data, index) => (
                                <GridCard imageUrl={data?.imageUrl} title={data?.title} content={data?.content} date={data?.updatedAt} category={data?.category} key={index} articleId={data.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DetailArticleById
