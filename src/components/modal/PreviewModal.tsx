import { FormArticles } from "@/hooks/zoodForm/SchemaArticle"
import Image from "next/image"
import ButtonSlate from "../button/ButtonSlate"

interface PreviewModalProps {
    open: boolean
    closeModal: () => void
    data: FormArticles | null
    category: string
}

const PreviewModal = ({ open, closeModal, data, category }: PreviewModalProps) => {
    if (!data) return null
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "visible bg-black/40" : "invisible"}`}
            onClick={closeModal}
        >
            <div
                className="bg-white rounded-lg p-6 flex flex-col shadow-xl max-w-2xl w-full"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <h2 className="text-xl text-center font-bold mb-4">Preview Article</h2>
                {data.imageUrl && (
                    <div className="relative w-full h-[240px] rounded-md mb-4 border-1 border-gray-400">
                        <Image
                            src={data.imageUrl}
                            alt={data.title}
                            fill
                            className="object-cover rounded border-gray-400"
                        />
                    </div>
                )}
                <h3 className="text-lg font-semibold">{data.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Category: {category}</p>
                <div className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <div className="flex justify-end mt-4 gap-2">
                    <ButtonSlate text="Close" sizeBtn="px-4" type="button" onClick={closeModal}/>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal;