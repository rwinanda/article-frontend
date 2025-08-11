"use client";

import Navbar from "@/components/Navbar";
import ProfileUserComponent from "@/components/ProfileUserComponent";
import { setNavbarBgScroll } from "@/redux/features/navbar/navbarSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const ProfileUser = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setNavbarBgScroll(({
            navbar: "bg-white shadow-sm",
            fontColor: "text-black",
            logoImage: "/images/logoipsum.png"
        })));
    }, [dispatch]);

    return (
        <div className="flex flex-col">
            <Navbar />
            <ProfileUserComponent textBtn="Back to Home" href="/" marginTop="mt-28" />
        </div>
    )
}

export default ProfileUser