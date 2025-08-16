import { MouseEventHandler } from "react"
import ButtonLoading from "../loading/ButtonLoading"

interface ButtonPrimaryProps {
    text: string
    type: "submit" | "button" | "reset"
    loading?: boolean
    marginTop?: string
    sizeBtn?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const ButtonPrimary = ({text, type, loading, marginTop, sizeBtn="w-full", onClick}: ButtonPrimaryProps) => {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 flex items-center justify-center ${sizeBtn} ${marginTop} py-2.5 rounded-sm font-medium text-white hover:text-gray-100 cursor-pointer transition-transform duration-300`}
            type={type}
            onClick={onClick}
        >
            {loading ? <ButtonLoading /> : text}
        </button>
    )
}

export default ButtonPrimary;