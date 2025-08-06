import { HandlerProfile } from "@/hooks/HandlerProfile";
import { ProfileResponse } from "@/types/authTypes";
import Image from "next/image"
// import Link from "next/link";
import { useEffect, useState } from "react";
import MenuProfile from "./user-profile/MenuProfile";

const Navbar = () => {
    const [profileResp, setProfileResp] = useState<ProfileResponse>({} as ProfileResponse)
    const [openMenuProfile, setOpenMenuProfile] = useState(false);

    useEffect(() => {
        HandlerProfile(setProfileResp);
    }, []);

    return (
        <div>
            <nav className="flex w-full z-0 justify-between">
                <div className="my-9 ml-15">
                    <Image src="/images/logoipsum-white.png" alt="header-bg" width='134' height='24' className="opacity-85" />
                </div>
                <div className="flex flex-col">
                    <button
                        type="button"
                        className="flex items-center my-9 mr-15 cursor-pointer"
                        onClick={() => setOpenMenuProfile(true)}
                    >
                        <div className="w-8 h-8 mr-1.5 flex items-center justify-center bg-blue-200 rounded-full">
                            <p className="text-xl uppercase font-medium text-blue-900">
                                {profileResp.username?.[0]}
                            </p>
                        </div>
                        <p className="font-medium text-white text-[16px] underline">
                            {profileResp.username}
                        </p>
                    </button>

                    <MenuProfile openMenuProfile={openMenuProfile} closeModal={() => setOpenMenuProfile(false)} />
                </div>
            </nav>
        </div>
    )
}

export default Navbar;