const TableNotFound = () => {
    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <div className="grid grid-cols-5 w-full items-center text-center bg-gray-100 py-3 transition duration-300 ease-in-out">

            </div>

            {/* Data Table */}
            <div
                className="flex w-full h-80 items-center justify-center py-3 border-1 text-xl border-slate-200 transition duration-300 ease-in-out">
                    No Articles Found.
            </div>
        </div>
    )
}

export default TableNotFound;