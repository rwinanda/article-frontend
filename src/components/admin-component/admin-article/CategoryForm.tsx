// import { Dispatch, SetStateAction } from "react";
import SelectCategory from "../SelectCategoryAdmin";
import { CategoryResponse } from "@/types/categoryTypes";

interface CategoryFormProps {
    categoryResp: CategoryResponse
}

export default function CategoryForm({ categoryResp }: CategoryFormProps) {
    return (
        <div className="flex flex-col mt-4">
            <p className="font-medium">
                Category
            </p>
            <SelectCategory
                categoryArray={categoryResp} />
        </div>
    )
}