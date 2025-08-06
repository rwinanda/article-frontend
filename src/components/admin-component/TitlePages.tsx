"use client";
import { HandlerProfile } from "@/hooks/HandlerProfile";
import { ProfileResponse } from "@/types/authTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
    title: string
}

const TitlePages = ({ title }: props) => {
    const [profileResp, setProfileResp] = useState<ProfileResponse>({} as ProfileResponse)

    useEffect(() => {
        HandlerProfile(setProfileResp)
    }, []);

    return (
        <div className="flex justify-between w-full px-4 py-4 border-b-2 border-gray-100">
            <p className="flex items-center font-semibold">
                {title}
            </p>
            <Link
                href="/admin/profile"
                className="flex items-center mr-15">
                <div className="w-8 h-8 mr-1.5 flex items-center justify-center bg-blue-200 rounded-full">
                    <p className="text-[16px] uppercase font-medium text-blue-900">
                        {profileResp.username?.[0]}
                    </p>
                </div>
                <p className="font-medium text-[16px] underline">
                    {profileResp.username}
                </p>
            </Link>
        </div>
    )
}

export default TitlePages