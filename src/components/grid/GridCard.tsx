import { StripHtmlTags } from '@/hooks/StripHtmlTags'
import { Category } from '@/types/articleTypes'
import Image from 'next/image'
import Link from 'next/link'

interface props {
    imageUrl: string
    title: string
    content: string
    date: string
    category: Category
    articleId: string
}

const GridCard = ({ imageUrl, title, content, date, category, articleId }: props) => {
    // Extract raw content to plain text
    const rawContent = content;
    const plainContent = StripHtmlTags(rawContent)

    return (
        <Link
            href={`/article/${articleId}`}
            className='flex flex-col cursor-pointer rounded-xl hover:border-1 hover:border-gray-100 gap-2'>
            <div className='relative w-full h-60 '>{
                !imageUrl ?
                    <Image
                        src="/images/image-not-available.jpg"
                        alt="image-not-available"
                        fill
                        className='object-cover border-gray-400 rounded-xl'
                    /> :
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className='object-cover border-gray-400 rounded-xl'
                    />
            }
            </div>

            <p className='text-sm text-gray-500'>{date}</p>

            <p className='font-semibold text-base'>{title}</p>

            <p className="text-sm text-gray-700 line-clamp-3">
                {plainContent}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
                <span
                    className="px-2 py-1 text-xs text-blue-900 bg-blue-200 rounded-full"
                >
                    {category?.name}
                </span>

            </div>
        </Link>
    )
}

export default GridCard;