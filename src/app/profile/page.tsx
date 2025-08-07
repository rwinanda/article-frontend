"use client";

import NavbarSecond from "@/components/NavbarSecond";
import ProfileUserComponent from "@/components/ProfileUserComponent";

const ProfileUser = () => {
    return (
        <div className="flex flex-col">
            <div className='relative w-full'>
                <NavbarSecond />
            </div>
            <ProfileUserComponent textBtn="Back to Home" href="/" marginTop="mt-28" />
        </div>
    )
}

export default ProfileUser