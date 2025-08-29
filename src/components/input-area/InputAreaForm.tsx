import { useFormContext } from "react-hook-form";

interface InputAreaFormProps {
    field: string
    type: string
    placeholder: string
    failedLogin?: boolean
    textFailed?: string
    flag?: "loginPage" | "registerPage"
}

const InputAreaForm = ({
    field,
    type,
    placeholder,
    failedLogin,
    textFailed,
    flag
}: InputAreaFormProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col">
            <input
                {...register(field)}
                type={type}
                placeholder={placeholder}
                className={
                    `${errors?.[field] && "border-red-400 outline-red-700"}
                    w-full px-4 py-2.5 mt-1 border-[#E2E8F0] outline-[#0065eb] border-2 rounded-sm`
                }
            />
            {
                (
                    errors.password && <p className="text-red-500">{(errors[field]?.message as string)}</p>
                )
                ||
                (
                    (failedLogin && field === "password" && flag === "loginPage") || (failedLogin && field === "username" && flag === "registerPage") ?
                        <p className="text-red-500">
                            {textFailed}
                        </p> : null
                )
                ||
                (
                    errors?.title && <p className="text-red-500">{(errors[field]?.message as string)}</p>
                )
            }
        </div>
    )
}

export default InputAreaForm;