import Image from "next/image"
import Link from "next/link"

interface Props {
    titleContent: string
}

const ArticleTopContent = ({titleContent}: Props) => {
    return (
        <div className="flex items-center transition-transform transform px-5 py-5.5">
            <Link href="/admin/articles" className="hover:scale-125">
                <Image src="/images/back.svg" alt="logo-back" width={20} height={20} />
            </Link>
            <p className="ml-2 font-medium">
                {titleContent}
            </p>
        </div>
    )
}

export default ArticleTopContent;