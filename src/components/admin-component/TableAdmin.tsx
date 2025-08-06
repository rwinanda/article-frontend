interface props {
    label: string[]
    classHeader: string | undefined
    classData: string | undefined
}

const TableAdmin = ({ label, classHeader, classData }: props) => {
    return (
        <div className="">
            {/* Header Table */}
            <div className=
                {classHeader}
            >
                {/* Title Table */}
                {label.map((dataLabel, index) => (
                    <label key={index}>
                        {dataLabel}
                    </label>
                ))}
            </div>

            {/* Data Table */}
            <div className=
                {classData}
            >
                <label className="text-center">
                    Thumbnails
                </label>
                <label className="flex mx-4 my-3">
                    Figma New Dev Mode: A Game-Changer for Designers & Developers
                </label>
                <label className="text-center">
                    Category
                </label>
                <label className="text-center">
                    Created At
                </label>
                <label className="text-center">
                    <a href="" className="text-blue-600 underline">Preview</a>
                    <a href="" className="mx-3 text-blue-600 underline">Edit</a>
                    <button className="text-red-500 underline">Delete</button>
                </label>
            </div>
        </div>
    )
}

export default TableAdmin