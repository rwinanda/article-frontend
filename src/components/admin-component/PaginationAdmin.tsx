import { useEffect } from "react"

interface Props {
    currentPage: number
    totalData: number
    limitData: number
    onPageChange: (data: number) => void
    setCurPage?: (data: number) => void
}

const PaginationAdmin = ({ currentPage, totalData, limitData, onPageChange, setCurPage }: Props) => {
    useEffect(() => {

        setCurPage?.(currentPage)
    }, [currentPage, setCurPage])
    
    const totalPages = Math.ceil(totalData / limitData);
    const renderPaginations = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        className={`px-3 py-1 rounded cursor-pointer ${i === currentPage ? 'border border-slate-200' : 'hover:bg-gray-100'
                            }`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPage - 2 && i > 1) ||
                (i === currentPage + 2 && i < totalPages)
            ) {
                pages.push(
                    <span key={`dots-${i}`} className="px-3 py-1">
                        ...
                    </span>
                );
            }
        }

        return pages;
    };

    return (
        <div className="flex px-1.5 py-6">
            <div className="flex w-full justify-center items-center">
                <div className="flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
                    <button
                        className="px-3 py-1 rounded text-slate-900 hover:bg-gray-100 cursor-pointer"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        &lt; Previous
                    </button>

                    {renderPaginations()}

                    <button
                        className="px-3 py-1 rounded text-slate-900 hover:bg-gray-100 cursor-pointer"
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div >
    )
}

export default PaginationAdmin

// <div className="flex justify-center items-center gap-2 mt-6 text-sm font-medium text-gray-700">
//     <button className="px-3 py-1 border rounded hover:bg-gray-100">&lt; Previous</button>
//     <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
//     <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
//     <span className="px-3 py-1">...</span>
//     <button className="px-3 py-1 border rounded hover:bg-gray-100">Next &gt;</button>
// </div>