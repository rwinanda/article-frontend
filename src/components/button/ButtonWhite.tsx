import { MouseEventHandler } from "react"
import ButtonLoading from "../loading/ButtonLoading"

interface ButtonWhiteProps {
    text: string
    type: "submit" | "button" | "reset"
    loading?: boolean
    sizeBtn?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const ButtonWhite = ({ text, type, loading, sizeBtn = "px-4", onClick }: ButtonWhiteProps) => {
    return (
        <button
            className={`border-1 border-slate-200 hover:border-slate-300 flex items-center justify-center ${sizeBtn} py-2 rounded-sm font-medium cursor-pointer transition-transform duration-300`}
            type={type}
            onClick={onClick}
        >
            {loading ? <ButtonLoading /> : text}
        </button>
    )
}

export default ButtonWhite;