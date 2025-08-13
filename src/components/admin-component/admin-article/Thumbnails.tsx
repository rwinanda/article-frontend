import PreviewImageComp from "../PreviewImageComp"
import { useFormContext } from "react-hook-form"

interface ThumbnailsProps {
    setImageFile: (file: File | null) => void
}

export default function Thumbnails({ setImageFile }: ThumbnailsProps) {
    const { setValue, watch, formState: { errors } } = useFormContext();
    return (
        <div className="flex flex-col">
            <p>
                Thumbnails
            </p>
            <PreviewImageComp
                setImageFile={setImageFile}
                imageUrl={watch("imageUrl")}
                setImageUrl={(url) => setValue("imageUrl", url)}
            />

            {/* 🛑 Error Display */}
            {errors?.imageUrl && (
                <p className="text-red-500 text-sm">
                    {(errors?.imageUrl?.message as string) || "Please upload image"}
                </p>
            )}
        </div>
    )
}