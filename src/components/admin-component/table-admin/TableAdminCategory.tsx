import { HandlerDateFormat } from "@/hooks/HandlerDateFormat"
import { CategoryResponse, UpdateCategoryPayload } from "@/types/categoryTypes"
import HeaderTable from "./HeaderTable"
import { Dispatch, SetStateAction, useState } from "react"

interface props {
    labelHeaders: string[]
    categoryResp: CategoryResponse
    setCategoryUpdPay: Dispatch<SetStateAction<UpdateCategoryPayload>>
    setSelectedData: Dispatch<SetStateAction<{
        id: string;
        name: string;
    }>>
    setOpenModalEdit: Dispatch<SetStateAction<boolean>>
    setOpenModalDel: Dispatch<SetStateAction<boolean>>
    setCategoryName?: Dispatch<SetStateAction<string>>
}

const TableAdminCategory = ({ labelHeaders, categoryResp, setCategoryUpdPay, setSelectedData, setOpenModalEdit, setOpenModalDel, setCategoryName }: props) => {

    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <HeaderTable labelHeaders={labelHeaders} />

            {/* Data Table */}
            {categoryResp.data?.map((cat, index) => {
                const rawDate = cat.createdAt
                const newDate = HandlerDateFormat(rawDate)

                // Set Category Name
                if (setCategoryName) {
                    setCategoryName(cat.name)
                }
                return (
                    <div
                        key={index}
                        className="grid grid-cols-3 w-full items-center py-3 border-1 border-slate-200">
                        <a className="text-center">
                            {cat.name}
                        </a>
                        <a className="text-center">
                            {newDate}
                        </a>
                        <div className="flex justify-center">
                            <button
                                className="mx-3 text-blue-600 hover:scale-110 underline cursor-pointer"
                                onClick={async () => {
                                    setCategoryUpdPay({ name: cat.name });
                                    setSelectedData({
                                        id: cat.id,
                                        name: cat.name
                                    });
                                    setOpenModalEdit(true)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:scale-110 underline cursor-pointer"
                                onClick={() => {
                                    setSelectedData({
                                        id: cat.id,
                                        name: cat.name
                                    })
                                    setOpenModalDel(true)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TableAdminCategory