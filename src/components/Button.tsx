import { MouseEventHandler } from "react"
import ButtonLoading from "./loading/ButtonLoading"

interface ButtonProps {
    name: string
    className: string | undefined
    type: "button" | "submit" | "reset"
    loading?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const ButtonComponent = ({ name, className, type, loading, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {loading ? <ButtonLoading/> : name }
        </button>
    )
}

export default ButtonComponent