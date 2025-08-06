import ButtonLoading from "./loading/ButtonLoading"

interface ButtonProps {
    name: string
    className: string | undefined
    type: "button" | "submit" | "reset"
    loading: boolean
}

const ButtonComponent = ({ name, className, type, loading }: ButtonProps) => {
    return (
        <button
            type={type}
            className={className}
        >
            {loading ? <ButtonLoading/> : name }
        </button>
    )
}

export default ButtonComponent