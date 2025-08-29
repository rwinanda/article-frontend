import { useEffect, useState } from "react";

interface NotifAlertProps {
    showNotif: boolean
    messageTitle: string
    messageDetail: string
}

const NotifAlert = ({ showNotif, messageTitle, messageDetail }: NotifAlertProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (showNotif) {
            setVisible(true)
            timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showNotif]);

    if (!visible) return null

    return (
        <div
            id="alert-1"
            className="fixed flex top-4 right-4 z-50 items-center w-fit p-4 mb-4 text-[#517153] rounded-lg bg-[#d6f4d7e1] border-2 border-[#b8d9b8]"
            role="alert"
        >
            <div className="flex flex-col">
                <p className="text-lg font-semibold">
                    {messageTitle}
                </p>
                <p className="text-sm font-medium">
                    {messageDetail}
                </p>
            </div>
            <button
                type="button"
                className="ms-auto -mr-1.5 ml-3 -my-1.5 bg-[#d6f4d7] rounded-lg focus:ring-2 focus:ring-[#b8d9b8] p-1.5 hover:bg-[#bfe0ba] inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                onClick={() => setVisible(false)}
                data-dismiss-target="#alert-1"
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default NotifAlert