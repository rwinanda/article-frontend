import Link from "next/link";

interface props {
    href: string
    nameAdd: string
}

const AddNavigate = ({href, nameAdd}:props) => {
    return (
        <div className="flex ml-auto justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-md">
            <Link href={href} className="text-white py-2.5 px-4">{nameAdd}</Link>
        </div>
    )
}

export default AddNavigate;