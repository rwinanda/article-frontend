"use client";

import ContentPages from "@/components/admin-component/ContentPages";
import PaginationAdmin from "@/components/admin-component/PaginationAdmin";
import Search from "@/components/admin-component/Search";
import TitlePages from "@/components/admin-component/TitlePages";
import TopContent from "@/components/admin-component/TopContent";
import SkeletonCategories from "@/components/loading/loading-skeleton/SkeletonCategories";
import AlertModal from "@/components/popup/AlertModal";
import FormModal from "@/components/popup/FormModal";
import { HandlerDateFormat } from "@/hooks/HandlerDateFormat";
import { DeleteCategoryAPI, GetAllCategoryAPI, PostCategoryAPI, UpdateCategoryAPI } from "@/services/categoryService";
import { CategoryParam, CategoryPayload, CategoryResponse, UpdateCategoryPayload } from "@/types/categoryTypes";
import { useEffect, useState } from "react";

const CategoryPage = () => {
    const labelHeaders = ["Category", "Created At", "Action"];
    const [openModalDel, setOpenModalDel] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    // State for delete selected data
    const [selectedData, setSelectedData] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoryResp, SetCategoryResp] = useState<CategoryResponse>({} as CategoryResponse)
    const [categoryParam, setCategoryParam] = useState<CategoryParam>({
        page: 1,
        limit: 10,
        search: ""
    });
    const [categoryPayload, setCategoryPayload] = useState<CategoryPayload>({
        name: ""
    });
    const [categoryUpdPay, setCategoryUpdPay] = useState<UpdateCategoryPayload>({
        name: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetAllCategoryAPI(categoryParam);
            SetCategoryResp(res);
            setLoading(false);
        }

        fetchData();
    }, [categoryParam]);

    const onPageChange = (page: number) => {
        setCategoryParam({ ...categoryParam, page });
    };

    const refreshPage = async () => {
        const res = await GetAllCategoryAPI(categoryParam);
        SetCategoryResp(res);
    };

    const deleteCategory = async (id: string) => {
        try {
            await DeleteCategoryAPI(id);
            await refreshPage();
            setOpenModalDel(false);
        } catch (error) {
            throw error
        }
    }

    const addCategory = async () => {
        try {
            await PostCategoryAPI(categoryPayload);
            await refreshPage();
            // Modal Close
            setOpenModalAdd(false)

        } catch (error) {
            throw error;
        }
    }

    const editCategory = async () => {
        try {
            await UpdateCategoryAPI(categoryUpdPay, selectedData);
            await refreshPage();
            setOpenModalEdit(false);
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    return (
        <div>
            <TitlePages title="Category" />

            <ContentPages >
                <TopContent text={`Total Category: ${categoryResp.totalData}`} />

                <div className="flex p-6 border-b-1 border-slate-200">
                    <div className="flex">
                        {/* <Search width="" placeholder="Search category" /> */}
                    </div>

                    <div className="flex ml-auto justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-md">
                        <button
                            className="text-white py-2.5 px-4"
                            onClick={() => setOpenModalAdd(true)}
                        >
                            + Add Category
                        </button>
                    </div>
                </div>

                {/* Table Article */}
                {loading ?
                    <SkeletonCategories />
                    :
                    <div className="flex flex-col">
                        {/* Header Table */}
                        <div className="grid grid-cols-3 w-full items-center text-center bg-gray-100 py-3">
                            {labelHeaders.map((title, index) => (
                                <label key={index}>
                                    {title}
                                </label>
                            ))}
                        </div>

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
                                                // console.log("Id => ", cat.id)
                                                setCategoryUpdPay({ name: cat.name });
                                                console.log("category update payload => ", categoryUpdPay)
                                                setSelectedData(cat.id);
                                                console.log("Selected data => ", selectedData)
                                                setOpenModalEdit(true)
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:scale-110 underline cursor-pointer"
                                            onClick={() => {
                                                console.log("Id => ", cat.id)
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
                        <AlertModal nameModal="Delete Category" textModal="Delete category “Technology”? This will remove it from master data permanently." nameButton="Delete" openModal={openModalDel} closeModal={() => setOpenModalDel(false)} handler={() => deleteCategory(selectedData)} bgColor="bg-red-600 hover:bg-red-700" />

                        <FormModal<CategoryPayload> nameModal="Add Category" nameInput="Category" openModal={openModalAdd} closeModal={() => setOpenModalAdd(false)} handlerButton={addCategory} nameButton="Add" placeholder="Input Category" data={categoryPayload} setData={setCategoryPayload} field="name" />

                        <FormModal<UpdateCategoryPayload> nameModal="Edit Category" nameInput="Category" openModal={openModalEdit} closeModal={() => setOpenModalEdit(false)} handlerButton={editCategory} nameButton="Save Changes" placeholder="Update Category" data={categoryUpdPay} setData={setCategoryUpdPay} field="name" />
                    </div>
                }


            </ContentPages>
            <PaginationAdmin currentPage={categoryParam.page} totalData={categoryResp.totalData} limitData={categoryParam.limit} onPageChange={onPageChange} />
        </div>
    )
}

export default CategoryPage;