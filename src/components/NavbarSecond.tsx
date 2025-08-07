"use client";

import { HandlerProfile } from "@/hooks/HandlerProfile";
import { ProfileResponse } from "@/types/authTypes";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

const NavbarSecond = () => {
    const [profile, setProfile] = useState<ProfileResponse>({} as ProfileResponse)

    useEffect(() => {
        HandlerProfile(setProfile)
    }, []);
    return (
        <div>
            <nav className="z-10 flex fixed w-full max-h-24 justify-between border-b-1 border-slate-200">
                <div className="my-9 ml-15">
                    <Link href="/">
                        <Image src="/images/logoipsum.png" alt="header-bg" width='134' height='24' className="opacity-85" />
                    </Link>
                </div>
                <div className="flex items-center my-9 mr-15">
                    <div className="flex items-center justify-center w-8 h-8 mr-1.5 bg-blue-200 rounded-full">
                        <p className="text-xl uppercase font-medium text-blue-900">
                            {profile.username?.[0]}
                        </p>
                    </div>
                    <p className="font-medium text-[16px] underline">
                        {profile.username}
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default NavbarSecond;