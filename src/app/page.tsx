"use client";

import ListArticle from "@/components/grid/ListArticle";
import Header from "@/components/header/Header";
import Navbar from "@/components/Navbar";
import { DebounceSearch } from "@/hooks/DebounceSearch";
import { setNavbarBgScroll } from "@/redux/features/navbar/navbarSlice";
import { useAppDispatch } from "@/redux/hook";
import { GetAllCategoryAPI } from "@/services/categoryService";
import { ArticleQuery } from "@/types/articleTypes";
import { CategoryParam, CategoryResponse } from "@/types/categoryTypes";
import { withAuth } from "@/utils/withAuth";
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

  const dispatch = useAppDispatch();

  // Searching
  DebounceSearch(searchTerm, setArticleParam);

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
      // console.log(`${window.scrollY}`)
      const scrollY = window.scrollY
      if (scrollY > 400) { // white navbar
        console.log("white")
        dispatch(setNavbarBgScroll(({
          navbar: "bg-white shadow-sm",
          fontColor: "text-black",
          logoImage: "/images/logoipsum.png"
        })));
      } else if (scrollY > 5) { // blur navbar
        dispatch(setNavbarBgScroll(({
          navbar: "backdrop-blur-sm shadow-sm",
          fontColor: "text-white",
          logoImage: "/images/logoipsum-white.png"
        })));
      } else {
        dispatch(setNavbarBgScroll(({
          navbar: "",
          fontColor: "text-white",
          logoImage: "/images/logoipsum-white.png",
        })));
      }
    };

    // Run On Mount
    handleScroll()

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Header categoryResp={categoryResp} setArticleParam={setArticleParam} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* List Article */}
      <ListArticle articleParam={articleParam} setArticleParam={setArticleParam} />
    </div>
  );
}

export default withAuth(Home, ["User"])
