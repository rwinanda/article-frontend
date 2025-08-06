interface props {
    nameModal: string
    textModal: string
    nameButton: string
    openModal: boolean
    closeModal: () => void
    handler: () => void
    bgColor: string
}

const AlertModal = ({nameModal, textModal, nameButton, openModal, closeModal, handler, bgColor}: props) => {
    return (
        // Backdrop
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors 
        ${openModal ? "visible bg-black/40" : "invisible"}`}
            onClick={closeModal}
        >
            {/* Modal */}
            <div
                className="bg-white rounded-xl z-20 p-6 flex flex-col w-100"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <p className="font-semibold mb-2 text-xl">
                    {nameModal}
                </p>
                <p className="font-normal text-slate-500">
                    {textModal}
                </p>

                {/* Button Confirmation */}
                <div className="ml-auto mt-4">
                    <button className="px-4 py-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer font-medium rounded-lg" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className={`${bgColor} px-4 py-2 ml-2 cursor-pointer text-white font-medium rounded-lg`} onClick={handler}>
                        {nameButton}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;