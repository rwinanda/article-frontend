"use client";

import Search from "@/components/admin-component/Search";
import ListArticle from "@/components/grid/ListArticle";
import Navbar from "@/components/Navbar";
import SelectCategory from "@/components/select/SelectCategory";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { ArticleQuery } from "@/types/articleTypes";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import { withAuth } from "@/utils/withAuth";
import Image from "next/image";
import { useEffect, useState } from "react";

function Home() {
  const [categoryResp, SetCategoryResp] = useState<CategoryResponse>({} as CategoryResponse)
  const [searchTerm, setSearchTerm] = useState("")
  const [articleParam, setArticleParam] = useState<ArticleQuery>({
    page: 1,
    limit: 9,
    title: "",
    category: ""
  });

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
      // Call API
      const categoriesAPI = await GetAllCategoryAPI(categoryParam);
      SetCategoryResp(categoriesAPI)
    }
    fetchData()
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {/* Top Header */}
        <div className="relative w-full h-125">
          {/* Background Picture */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/header-bg.jpg" alt="header-bg" fill className="opacity-85 object-cover" priority />
          </div>

          {/* Background Colour */}
          <div className="absolute bg-[#2563EBDB] w-full h-125 z-20">
            {/* Navbar */}
            <Navbar />

            {/* Content Header */}
            <div className="flex justify-center w-full">
              <div className="flex flex-col w-[730px] items-center justify-center">
                <p className="text-white font-bold mb-3">
                  Blog genzet
                </p>
                <p className="text-white font-medium text-5xl mb-3 text-center">
                  The Journal : Design Resources, Interviews, and Industry News
                </p>
                <p className="text-white font-bold text-2xl">
                  Your daily dose of design insights!
                </p>

                {/* Menu Select and Search*/}
                <div className="flex max-w-152 max-h-20 mt-10 bg-blue-500 p-2.5 rounded-xl">
                  {/* <SelectOption /> */}
                  <SelectCategory categoryArray={categoryResp} setArticleParam={setArticleParam} />
                  <Search placeholder="Searh by title" value={searchTerm} onChange={setSearchTerm} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Article */}
        <ListArticle articleParam={articleParam} setArticleParam={setArticleParam} />
      </div>
    </>
  );
}

export default withAuth(Home, ["User"])
