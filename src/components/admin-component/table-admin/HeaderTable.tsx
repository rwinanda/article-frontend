interface HeaderTableProps {
    labelHeaders: string[]
}

const HeaderTable = ({labelHeaders}: HeaderTableProps) => {
    return (
        <div className={`grid grid-cols-${labelHeaders.length} w-full items-center text-center bg-gray-100 py-3 transition duration-300 ease-in-out`}>
            {labelHeaders.map((label, index) => (
                <label key={index}>
                    {label}
                </label>
            ))}
        </div>
    )
}

export default HeaderTable