const SkeletonCategories = () => {
    const numberOfRows = 3;
    return (
        <div className="flex flex-col">
            {/* Header Table */}
            <div className="grid grid-cols-3 w-full items-center text-center bg-gray-100 py-3">

            </div>

            {/* Data Table */}
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-3 w-full items-center py-3 border-1 border-slate-200">
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 relative animate-pulse bg-gray-300 rounded-md">

                        </div>
                    </div>
                    <label className="mx-4 my-3 h-16 animate-pulse bg-gray-300 rounded-md">

                    </label>
                    <label className="h-16 text-center bg-gray-300 rounded-md">

                    </label>
                </div>
            ))
            }
        </div>
    )
}

export default SkeletonCategories;