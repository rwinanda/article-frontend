import { ArticleResponse } from "@/types/articleTypes"
import { HandlerDateFormat } from "@/hooks/HandlerDateFormat"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import HeaderTable from "./HeaderTable"

interface props {
    articleResp: ArticleResponse
    setOpenModalDel: Dispatch<SetStateAction<boolean>>
    setSelectedData: (data: string) => void
}

const TableAdminArticle = ({ articleResp, setOpenModalDel, setSelectedData }: props) => {
    const labelHeaders = ["Thumbnails", "Title", "Category", "Created At", "Action"];
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <HeaderTable labelHeaders={labelHeaders} />

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
                                    !imageLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                                            <span className="text-gray-400 text-sm">Loading...</span>
                                        </div>
                                    )
                                }

                                {/* Actual Image */}
                                {
                                    <Image
                                        src={article.imageUrl || "/images/image-not-available.jpg"}
                                        alt={`${article.title}-thumbnails` || "image-not-available"}
                                        fill
                                        className={`object-cover border-gray-400 rounded-xl ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                                        onLoadingComplete={() => setImageLoaded(true)}
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
                            <Link href={`/article/${article?.id}`} className="text-blue-600 underline hover:scale-110">Preview</Link>
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

        </div>
    )
}

export default TableAdminArticle