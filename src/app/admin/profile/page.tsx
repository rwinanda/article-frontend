"use client";
import ContentPages from "@/components/admin-component/ContentPages";
import TitlePages from "@/components/admin-component/TitlePages";
import { HandlerProfile } from "@/hooks/HandlerProfile";
import { ProfileResponse } from "@/types/authTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePages = () => {
    const [profile, setProfile] = useState<ProfileResponse>({} as ProfileResponse)

    useEffect(() => {
        HandlerProfile(setProfile)
    }, []);

    return (
        <div>
            <TitlePages title="User Profile" />
            <ContentPages>
                <div className="flex py-6 justify-center">
                    <div className="w-100">
                        <p className="flex justify-center mt-6 mb-9">User Profile</p>

                        {/* Picture */}
                        <div className="flex justify-center items-center mb-6">
                            <div className="flex items-center justify-center w-17 h-17 bg-blue-200 rounded-full">
                                <p className="text-2xl uppercase font-medium text-blue-900">
                                    {profile.username?.[0]}
                                </p>
                            </div>
                        </div>

                        <dl className="text-[16px]">
                            <div className="flex bg-gray-100 py-2.5 px-3 mx-4 rounded-sm">
                                <dt className="inline-block w-24 font-semibold">User</dt>
                                <dt>: </dt>
                                <dd className="ml-4">
                                    {profile.username}
                                </dd>
                            </div>
                            <div className="flex bg-gray-100 my-3 py-2.5 px-3 mx-4 rounded-sm">
                                <dt className="inline-block w-24 font-semibold">Password</dt>
                                <dt>: </dt>
                                <dd className="ml-4">
                                    ******
                                </dd>
                            </div>
                            <div className="flex bg-gray-100 py-2.5 px-3 mx-4 rounded-sm">
                                <dt className="inline-block w-24 font-semibold">Role</dt>
                                <dt>: </dt>
                                <dd className="ml-4">
                                    {profile.role}
                                </dd>
                            </div>
                        </dl>

                        <Link
                            href="/admin"
                            className="flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 mx-4 mt-9 mb-6 rounded-sm">
                            <p>
                                Back to  dashboard
                            </p>
                        </Link>

                    </div>
                </div>
            </ContentPages>
        </div>
    )
}

export default ProfilePages;