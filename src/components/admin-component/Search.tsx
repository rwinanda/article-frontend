import Image from "next/image";

interface props {
    placeholder: string
    width?: string
    value: string
    onChange: (value:string) => void
}

const Search = ({placeholder, width = "w-70", value, onChange}:props) => {
    return (
        <div className={`flex ml-2 rounded-sm ${width}`}>
            <div className="flex w-full px-4 py-2 bg-white border border-gray-300 rounded-sm outline-none">
                <Image src="/images/search.svg" alt="logo-ipsum" width={20} height={20} />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="ml-1.5 px-1 focus:outline-none"
                />
            </div>
        </div>
    )
}

export default Search;