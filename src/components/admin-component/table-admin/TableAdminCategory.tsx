import { HandlerDateFormat } from "@/hooks/HandlerDateFormat"
import { CategoryResponse, UpdateCategoryPayload } from "@/types/categoryTypes"
import HeaderTable from "./HeaderTable"
import { Dispatch, SetStateAction } from "react"

interface props {
    labelHeaders: string[]
    categoryResp: CategoryResponse
    setCategoryUpdPay: Dispatch<SetStateAction<UpdateCategoryPayload>>
    setSelectedData: (data: string) => void
    setOpenModalEdit: Dispatch<SetStateAction<boolean>>
    setOpenModalDel: Dispatch<SetStateAction<boolean>>
}

const TableAdminCategory = ({labelHeaders, categoryResp, setCategoryUpdPay, setSelectedData,   setOpenModalEdit, setOpenModalDel}: props) => {
    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <HeaderTable labelHeaders={labelHeaders} />

            {/* Data Table */}
            {categoryResp.data?.map((cat, index) => {
                const rawDate = cat.createdAt
                const newDate = HandlerDateFormat(rawDate)
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
                                    setSelectedData(cat.id);
                                    setOpenModalEdit(true)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:scale-110 underline cursor-pointer"
                                onClick={() => {
                                    setSelectedData(cat.id)
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