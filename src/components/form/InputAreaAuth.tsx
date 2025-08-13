import { useFormContext } from "react-hook-form";

interface InputAreaAuthProps {
    field: string
    type: string
    placeholder: string
    failedLogin: boolean
}

const InputAreaAuth = ({ field, type, placeholder, failedLogin }: InputAreaAuthProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col">
            <input
                {...register(field)}
                type={type}
                placeholder={placeholder}
                className={
                    `${errors?.[field] && "border-red-400 outline-red-700"}
                    w-full px-4 py-2 mt-1 border-[#E2E8F0] outline-[#0065eb] border-2 rounded-sm`
                }
            />
            {
                (
                    errors.password && <p className="text-red-500">{(errors[field]?.message as string)}</p>
                )
                ||
                (
                    (failedLogin && field === "password") &&
                    <p className="text-red-500">
                        Username or Password are Incorect
                    </p>
                )
            }
        </div>
    )
}

export default InputAreaAuth;