import ButtonPrimary from "../button/ButtonPrimary"
import ButtonRed from "../button/ButtonRed"
import ButtonWhite from "../button/ButtonWhite"

interface props {
    nameModal: string
    textModal: string
    nameButton: string
    openModal: boolean
    closeModal: () => void
    handler: () => void
    flag?: string
}

const AlertModal = ({ nameModal, textModal, nameButton, openModal, closeModal, handler, flag }: props) => {
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
                <div className="flex ml-auto mt-4 gap-2">
                    <ButtonWhite text="Cancel" type="button" onClick={closeModal} />
                    {
                        flag === "logout"
                            ?
                            <ButtonPrimary text={nameButton} type="submit" onClick={handler} sizeBtn="px-4" />
                            :
                            <ButtonRed text={nameButton} type="submit" onClick={handler} />
                    }
                </div>
            </div>
        </div>
    )
}

export default AlertModal;