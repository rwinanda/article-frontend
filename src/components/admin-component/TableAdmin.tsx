import { ArticleResponse } from "@/types/articleTypes"
import AlertModal from "../popup/AlertModal"
import { HandlerDateFormat } from "@/hooks/HandlerDateFormat"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"

interface props {
    articleResp: ArticleResponse
    deleteArticle: (id: string) => void
    openModalDel: boolean
    setOpenModalDel: Dispatch<SetStateAction<boolean>>
}

const TableAdmin = ({ articleResp, deleteArticle, openModalDel, setOpenModalDel }: props) => {
    const [selectedData, setSelectedData] = useState("");
    const labelHeaders = ["Thumbnails", "Title", "Category", "Created At", "Action"];


    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <div className="grid grid-cols-5 w-full items-center text-center bg-gray-100 py-3 transition duration-300 ease-in-out">
                {labelHeaders.map((label, index) => (
                    <label key={index}>
                        {label}
                    </label>
                ))}
            </div>

            {/* Data Table */}
            {articleResp.data?.map((article, index) => {
                const rawDate = article?.updatedAt;
                const newDate = HandlerDateFormat(rawDate);
                return (
                    <div
                        key={index}
                        className="grid grid-cols-5 w-full items-center py-3 border-1 border-slate-200 transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="flex justify-center items-center">
                            <div className="w-16 h-16 relative">
                                {
                                    !article.imageUrl ?
                                        <Image
                                            src="/images/image-not-available.jpg"
                                            alt="image-not-available"
                                            fill
                                            className='object-cover border-gray-400 rounded-xl'
                                        /> :
                                        <Image
                                            src={article.imageUrl}
                                            alt={`${article.title}-thumbnails`}
                                            fill
                                            sizes="64px"
                                            className="object-cover rounded-md"
                                            style={{ objectFit: "cover" }}
                                        />
                                }
                            </div>
                        </div>
                        <label className="mx-4 my-3 line-clamp-2">
                            {article?.title}
                        </label>
                        <label className="text-center">
                            {article?.category?.name}
                        </label>
                        <label className="text-center">
                            {newDate}
                        </label>
                        <div className="flex justify-center">
                            <a href={`/article/${article?.id}`} className="text-blue-600 underline hover:scale-110">Preview</a>
                            <Link href={`/admin/articles/update/${article?.id}`} className="mx-3 text-blue-600 underline hover:scale-110">
                                Edit
                            </Link>
                            <button
                                className="text-red-500 underline hover:scale-110"
                                onClick={() => {
                                    setSelectedData(article.id)
                                    setOpenModalDel(true)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
            <AlertModal nameModal="Delete Articles" textModal="Deleting this article is permanent and cannot be undone. All related content will be removed." nameButton="Delete" openModal={openModalDel} closeModal={() => setOpenModalDel(false)} handler={() => deleteArticle(selectedData)} bgColor="bg-red-600 hover:bg-red-700" />
        </div>
    )
}

export default TableAdmin