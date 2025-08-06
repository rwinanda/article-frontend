"use client";

import { useEffect, useState } from "react";
import { HandlerProfile } from "./HandlerProfile";
import { usePathname, useRouter } from "next/navigation";
import { ProfileResponse } from "@/types/authTypes";

export const CheckCookies = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const [profile, setProfile] = useState<ProfileResponse>({} as ProfileResponse);
    const router = useRouter();
    const pathname = usePathname();


    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
            router.push("/login");
        } else {
            HandlerProfile(setProfile); // ✅ Load profile when token exists
        }
    }, [token, router]);

    // Role-based route redirection
    useEffect(() => {
        if (profile.role) {
            if (profile.role === "Admin" && !pathname.startsWith("/admin")) {
                router.push("/admin");
            } else if (profile.role === "User" && pathname.startsWith("/admin")) {
                router.push("/");
            }
        }
    }, [profile.role, pathname, router]);

    return null; // nothing to render
};
