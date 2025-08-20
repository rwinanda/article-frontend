import { CategoryResponse } from "@/types/categoryTypes"
import { useFormContext } from "react-hook-form"

interface props {
    categoryArray: CategoryResponse
    setCategoryName: (data: string) => void
}


const SelectCategoryAdmin = ({ categoryArray, setCategoryName }: props) => {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const selectedCategoryId = watch("categoryId");

    return (
        <div className="flex flex-col gap-1">
            <select
                className={`px-4 py-2 text-gray-900 bg-white border ${errors?.categoryId && "border-red-500"} border-gray-200 hover:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
                value={selectedCategoryId || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    setValue("categoryId", value); // ⬅️ Update ke form RHF

                    // Get category name to display on preview
                    const selectedCategory = categoryArray.data.find(cat => cat.id === value)
                    if (selectedCategory) {
                        setCategoryName(selectedCategory.name)
                    }
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

            {/* 🛑 Error Display */}
            {errors.categoryId ? (
                <p className="text-red-500 text-sm">
                    {(errors.categoryId.message as string) || "Category is required"}
                </p>
            ) : null}
        </div>
    )
}

export default SelectCategoryAdmin;