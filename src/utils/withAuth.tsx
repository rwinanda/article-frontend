// utils/withAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { ProfileResponse } from "@/types/authTypes";
import { HandlerProfile } from "@/hooks/HandlerProfile";

type WithAuthProps = {
    children?: ReactNode;
    [key: string]: any;
}


export function withAuth<T extends WithAuthProps>(Component: ComponentType<T>, allowedRoles: string[] = []) {
    return function ProtectedComponent(props: T) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        const [profile, setProfile] = useState<ProfileResponse>({} as ProfileResponse);

        const router = useRouter();

        const pathname = usePathname();

        // Redirect to login when token doesn't exist
        useEffect(() => {
            const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
            if (!token) {
                router.replace("/login");
                return;
            }
            HandlerProfile(setProfile);

            setLoading(false);
        }, [router]);

        // Role-based route redirection
        useEffect(() => {
            if (!profile) return;

            const role = profile.role;

            // Jika role tidak termasuk yang diizinkan
            if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
                // Redirect ke tempat lain tanpa render unauthorized
                if (role === "User") {
                    router.replace("/");
                }
                return;
            }

            setIsAuthenticated(true);
            setLoading(false);
        }, [profile, pathname, router]);

        if (loading || !isAuthenticated) return null; // atau tambahkan loading spinner

        return <Component {...props} />;
    };
}
