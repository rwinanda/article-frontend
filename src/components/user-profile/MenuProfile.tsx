import { LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MenuProfileProps {
    openMenuProfile: boolean
    closeModal: () => void
}

const MenuProfile = ({ openMenuProfile, closeModal }: MenuProfileProps) => {
    const router = useRouter();

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
        <div
            className={`fixed inset-0 flex transition-colors ${openMenuProfile ? "visible bg-black/40" : "invisible"}`}
            onClick={closeModal}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="absolute top-20 right-10 bg-white p-[5px] rounded-md cursor-pointer"
            >
                <Link
                    href={"/profile"}
                    className="flex px-2 py-1.5 mb-2 w-[214px] hover:bg-gray-200 rounded-md">
                    My Account
                </Link>
                <button
                    type="button"
                    className="flex px-2 py-1.5 w-[214px] hover:bg-gray-200 rounded-md text-red-500"
                    onClick={LogoutHandler}
                >
                    <div className="mr-2">
                        <LogOut />
                    </div>
                    <p>
                        Log out
                    </p>
                </button>
            </div>
        </div>
    )
}

export default MenuProfile