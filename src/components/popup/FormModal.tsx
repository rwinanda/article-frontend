import { Dispatch, SetStateAction } from "react"

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

const FormModal = <T,>({ nameModal, nameInput, openModal, closeModal, handlerButton, nameButton, placeholder, data, setData, field }: props<T>) => {
    return (

        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors 
        ${openModal ? "visible bg-black/40" : "invisible"}`}
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
                <div className="ml-auto mt-4">
                    <button className="px-4 py-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer font-medium rounded-lg" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 ml-2 cursor-pointer text-white font-medium rounded-lg`} onClick={handlerButton}>
                        {nameButton}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormModal;