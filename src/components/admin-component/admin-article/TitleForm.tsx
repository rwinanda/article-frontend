// import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";

// interface Props<T> {
//     articleForm: T,
//     setArticleForm: Dispatch<SetStateAction<T>>
//     field: keyof T
// }

// const TitleForm = <T,>({ articleForm, setArticleForm, field }: Props<T>) => {
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

            {/* <input
                type="text"
                placeholder={`Input title`}
                className="w-full mt-1 px-3 py-2.5 border-1 border-slate-200 rounded-md"
                value={String(articleForm[field] ?? "")}
                onChange={(e) => {
                    const value = e.target.value;
                    setArticleForm((prev) => ({
                        ...prev,
                        [field]: value,
                    }));
                }}
            /> */}

        </div>
    )
}

export default TitleForm