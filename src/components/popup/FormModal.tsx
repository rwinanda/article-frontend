import { Dispatch, SetStateAction } from "react"
import ButtonWhite from "../button/ButtonWhite"
import ButtonPrimary from "../button/ButtonPrimary"

interface props<T> {
    nameModal: string
    nameInput: string
    openModal: boolean
    closeModal: () => void
    handlerButton: () => void
    nameButton: string
    placeholder: string
    data: T;
    setData: Dispatch<SetStateAction<T>>;
    field: keyof T;
}

const FormModal = <T,>({
    nameModal,
    nameInput,
    openModal,
    closeModal,
    handlerButton,
    nameButton,
    placeholder,
    data,
    setData,
    field
}: props<T>) => {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${openModal ? "visible bg-black/40" : "invisible"}`}
            onClick={closeModal}
        >
            {/* Modal */}
            <div
                className="bg-white rounded-xl p-6 flex flex-col w-100"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="flex">
                    <p className="font-semibold mb-2 text-xl">
                        {nameModal}
                    </p>
                </div>

                <div className="flex flex-col">
                    <p className="font-medium text-sm mb-1">
                        {nameInput}
                    </p>
                    <div className="flex rounded-sm">
                        <div className="flex w-full px-3 py-2 border border-gray-300 rounded-sm outline-none">
                            <input
                                type="text"
                                placeholder={placeholder}
                                className="ml-1.5 px-1 focus:outline-none"
                                value={String(data[field] ?? "")}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData((prev) => ({
                                        ...prev,
                                        [field]: value,
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Button Confirmation */}
                <div className="flex gap-2 ml-auto mt-4">
                    <ButtonWhite text="Cancel" type="button" onClick={closeModal}/>
                    <ButtonPrimary text={nameButton} type="submit" onClick={handlerButton} sizeBtn="px-4" />
                </div>
            </div>
        </div>
    )
}

export default FormModal;