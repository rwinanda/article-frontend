import { ReactNode } from "react";

interface props {
    children: ReactNode
}

const ContentPages = ({children}: props) => {
    return (
        <div className="flex w-full min-h-screen p-4 bg-gray-100">
            <div className="flex w-full flex-col border-1 border-[#E2E8F0] bg-[#F9FAFB] rounded-sm">
                {children}
            </div>
        </div>
    )
}

export default ContentPages;