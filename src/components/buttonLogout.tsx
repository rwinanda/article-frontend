import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "./popup/AlertModal";


export const ButtonLogout = () => {
    // const [loadingBtn, setLoadingBtn] = useState(false)
    const router = useRouter();

    const [openModal, setOpenModal] = useState(false);

    const LogoutHandler = async () => {
        try {
            // Clear session
            sessionStorage.clear();
            // redriect after success   
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <div className="flex mt-2 px-4 hover:bg-[rgba(255,255,255,0.25)] rounded-sm">
            <Image src="/images/logout.svg" alt="logo-ipsum" width={20} height={20} />
            <button className="flex py-2 ml-1 w-full text-white rounded-sm"
                onClick={() => setOpenModal(true)}
            >
                {"Logout"}
            </button>

            {/* Modal */}
            <AlertModal nameModal="Logout" textModal="Are you sure you want to logout?" nameButton="Logout" openModal={openModal} closeModal={() => setOpenModal(false)} handler={LogoutHandler} bgColor="bg-blue-600 hover:bg-blue-700"/>
        </div>

    )
}