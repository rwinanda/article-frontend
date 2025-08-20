import { MouseEventHandler } from "react"
import ButtonLoading from "../loading/ButtonLoading"

interface ButtonSlateProps {
    text: string
    type: "submit" | "button" | "reset"
    loading?: boolean
    sizeBtn?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const ButtonSlate = ({text, type, loading, sizeBtn="px-4", onClick}: ButtonSlateProps) => {
    return (
        <button
            className={`bg-slate-200 hover:bg-slate-300 flex items-center justify-center ${sizeBtn} py-2 rounded-sm font-medium cursor-pointer transition-transform duration-300`}
            type={type}
            onClick={onClick}
        >
            {loading ? <ButtonLoading /> : text}
        </button>
    )
}

export default ButtonSlate;