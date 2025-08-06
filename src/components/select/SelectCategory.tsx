import { ArticleQuery } from "@/types/articleTypes"
import { CategoryResponse } from "@/types/categoryTypes"
import { Dispatch, SetStateAction } from "react"

interface props {
    categoryArray: CategoryResponse
    setArticleParam: Dispatch<SetStateAction<ArticleQuery>>
}


const SelectCategory = ({ categoryArray, setArticleParam }: props) => {
    return (
        <div className="flex flex-col gap-1">
            <select
                className={`px-4 py-4 text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
                onChange={(e) => {
                    setArticleParam((prev) => ({
                        ...prev,
                        category: e.target.value
                    }))
                }}
            >
                <option value="" disabled hidden>
                    Category
                </option>
                {categoryArray.data?.map((cat, idxCat) => (
                    <option key={idxCat} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectCategory;