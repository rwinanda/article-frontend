"use client";

import ContentPages from "@/components/admin-component/ContentPages";
import PaginationAdmin from "@/components/admin-component/PaginationAdmin";
import TableAdminCategory from "@/components/admin-component/table-admin/TableAdminCategory";
import TitlePages from "@/components/admin-component/TitlePages";
import TopContent from "@/components/admin-component/TopContent";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import SkeletonCategories from "@/components/loading/loading-skeleton/SkeletonCategories";
import AlertModal from "@/components/popup/AlertModal";
import FormModal from "@/components/popup/FormModal";
import { DeleteCategoryAPI, GetAllCategoryAPI, PostCategoryAPI, UpdateCategoryAPI } from "@/services/categoryService";
import { CategoryParam, CategoryPayload, CategoryResponse, UpdateCategoryPayload } from "@/types/categoryTypes";
import { useEffect, useState } from "react";

const CategoryPage = () => {
    const labelHeaders = ["Category", "Created At", "Action"];
    const [openModalDel, setOpenModalDel] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    // State for delete selected data
    const [selectedData, setSelectedData] = useState({
        id: "",
        name: ""
    });
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
                    <ButtonPrimary text="+ Add Category" type="button" marginTop="ml-auto" sizeBtn="px-4" onClick={() => setOpenModalAdd(true)} />
                </div>

                {/* Table Article */}
                {loading ?
                    <SkeletonCategories />
                    :
                    <TableAdminCategory labelHeaders={labelHeaders} categoryResp={categoryResp} setCategoryUpdPay={setCategoryUpdPay} setSelectedData={setSelectedData} setOpenModalEdit={setOpenModalEdit} setOpenModalDel={setOpenModalDel} />
                }
                <AlertModal nameModal="Delete Category" textModal={`Delete category “${selectedData.name}”? This will remove it from master data permanently.`} nameButton="Delete" openModal={openModalDel} closeModal={() => setOpenModalDel(false)} handler={() => deleteCategory(selectedData.id)} />

                <FormModal<CategoryPayload> nameModal="Add Category" nameInput="Category" openModal={openModalAdd} closeModal={() => setOpenModalAdd(false)} handlerButton={addCategory} nameButton="Add" placeholder="Input Category" data={categoryPayload} setData={setCategoryPayload} field="name" />

                <FormModal<UpdateCategoryPayload> nameModal="Edit Category" nameInput="Category" openModal={openModalEdit} closeModal={() => setOpenModalEdit(false)} handlerButton={editCategory} nameButton="Save Changes" placeholder="Update Category" data={categoryUpdPay} setData={setCategoryUpdPay} field="name" />

            </ContentPages>
            <PaginationAdmin currentPage={categoryParam.page} totalData={categoryResp.totalData} limitData={categoryParam.limit} onPageChange={onPageChange} />
        </div>
    )
}

export default CategoryPage;