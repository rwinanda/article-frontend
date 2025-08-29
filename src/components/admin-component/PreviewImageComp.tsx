import Image from "next/image";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface RHFPreviewImageProps {
    setImageFile: (file: File | null) => void;
}

export default function PreviewImageComp({
    setImageFile,
}: RHFPreviewImageProps) {
    const { setValue, watch, formState: { errors } } = useFormContext();

    const imageUrl = watch("imageUrl")
    const setImageUrl = (url: string | null) => setValue("imageUrl", url)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl); // update imageUrl di form (RHF)
            setImageFile(file);
        }
    };

    const handleDelete = () => {
        if (imageUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
        setImageFile(null);
    };

    return (
        <div className="mt-1 border-gray-100 max-w-[244px] h-[163px]">
            <div className={`border-2 border-dashed w-full h-full ${errors?.imageUrl && "border-red-500"} border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-red-400 px-3 pt-3 pb-9 relative overflow-hidden`}>
                {!imageUrl ? (
                    <label
                        htmlFor="file-input"
                        className="w-full h-full flex items-center justify-center cursor-pointer relative overflow-hidden"
                    >
                        <input
                            id="file-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleChange}
                        />
                        <div className="flex flex-col items-center pointer-events-none">
                            <Image
                                src="/images/pics.svg"
                                alt="logo-back"
                                className="mb-3"
                                width={20}
                                height={20}
                            />
                            <p className="text-slate-500 font-normal">Click to select files</p>
                            <p className="text-slate-500 font-normal">
                                Support File Type: jpg or png
                            </p>
                        </div>
                    </label>
                ) : (
                    <>
                        <div className="relative w-full h-full rounded">
                            <Image
                                src={imageUrl}
                                alt="Preview"
                                fill
                                className="object-cover rounded"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex gap-2 text-xs bg-white/80 px-2 py-1 rounded">
                            <label className="text-blue-500 underline cursor-pointer relative">
                                Change
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete();
                                }}
                                className="text-red-500 underline"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}