import { useFormContext } from "react-hook-form";

const TitleForm = ({ field }: { field: "title" }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col mt-4">
            <p className="font-medium">
                Title
            </p>

            <input
                type="text"
                placeholder="Input title"
                className={`w-full mt-1 px-3 py-2.5 border-1 ${errors?.[field] && "border-red-500"} border-red-200 outline outline-none rounded-md`}
                {...register(field)}
            />

            {errors?.[field] && (
                <p className="text-red-500 text-sm mt-1">
                    {(errors[field]?.message as string) || ""}
                </p>
            )}

        </div>
    )
}

export default TitleForm