// import { Dispatch, SetStateAction } from "react";
import SelectCategory from "../SelectCategoryAdmin";
import { CategoryResponse } from "@/types/categoryTypes";
// import { ArticlePayload } from "@/types/articleTypes";

interface CategoryFormProps {
    categoryResp: CategoryResponse
}

// export default function CategoryForm<T,>({ articleForm, setArticleForm, categoryResp }: CategoryFormProps<T>) {
export default function CategoryForm({ categoryResp }: CategoryFormProps) {
    return (
        <div className="flex flex-col mt-4">
            <p className="font-medium">
                Category
            </p>
            <SelectCategory
                categoryArray={categoryResp} />
            {/* <SelectCategory
                articleForm={articleForm as ArticlePayload}
                onChange={(e) => {
                    setArticleForm({
                        ...articleForm,
                        categoryId: e.target.value
                    });
                }} categoryArray={categoryResp} /> */}
        </div>
    )
}