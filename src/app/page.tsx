"use client";

import Search from "@/components/admin-component/Search";
import ListArticle from "@/components/grid/ListArticle";
import Navbar from "@/components/Navbar";
import SelectCategory from "@/components/select/SelectCategory";
import { setNavbarBgScroll } from "@/redux/features/navbar/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
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

  const navbarBgScroll = useAppSelector((state) => state.navbar);
  const dispatch = useAppDispatch();

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

  // Navbar Effect
  useEffect(() => {
    const handleScroll = () => {
      console.log(`${window.scrollY}`)
      if (window.scrollY > 400) { // white navbar
        console.log("white")
        dispatch(setNavbarBgScroll(({
          ...navbarBgScroll,
          navbar: "bg-white shadow-sm",
          fontColor: "text-black",
          logoImage: "/images/logoipsum.png"
        })));
      } else if (window.scrollY > 5) { // blur navbar
        dispatch(setNavbarBgScroll(({
          ...navbarBgScroll,
          navbar: "backdrop-blur-sm shadow-sm",
          fontColor: "text-white",
          logoImage: "/images/logoipsum-white.png"
        })));
      } else {
        dispatch(setNavbarBgScroll(({
          ...navbarBgScroll,
          navbar: "",
          fontColor: "text-white",
          logoImage: "/images/logoipsum-white.png",
        })));
      }
    };

    console.log("window.addEventListener")
    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("window.removeEventListener")
      window.removeEventListener("scroll", handleScroll)
    };
  }, [dispatch, navbarBgScroll]);

  return (
    <>
      <div className="flex flex-col">
        {/* Top Header */}
        {/* Navbar */}
        <Navbar />

        <div className="relative w-full h-125">
          {/* Background Picture */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/header-bg.jpg" alt="header-bg" fill className="opacity-85 object-cover" priority />
          </div>

          {/* Background Colour */}
          <div className="absolute bg-[#2563EBDB] w-full h-125 z-20">
            {/* Content Header */}
            <div className={`flex justify-center w-full mt-32`}>
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
        <div className="pt-20">
          <ListArticle articleParam={articleParam} setArticleParam={setArticleParam} />
        </div>
      </div>
    </>
  );
}

export default withAuth(Home, ["User"])
