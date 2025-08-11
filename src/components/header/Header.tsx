import SelectCategory from "../select/SelectCategory"
import Search from "../admin-component/Search"
import { ArticleQuery } from "@/types/articleTypes"
import { Dispatch, SetStateAction } from "react"
import { CategoryResponse } from "@/types/categoryTypes"
import HeaderPicture from "./HeaderPicture"

interface HeaderProps {
    categoryResp: CategoryResponse
    setArticleParam: Dispatch<SetStateAction<ArticleQuery>>
    searchTerm: string
    setSearchTerm: (value: string) => void
}

const Header = ({ categoryResp, setArticleParam, searchTerm, setSearchTerm }: HeaderProps) => {
    return (
        <div className="relative w-full h-125">
            <HeaderPicture />

            {/* Background Colour */}
            <div className="absolute bg-[#2563EBDB] w-full h-125 z-10">
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
    )
}

export default Header