"use client";

import Image from "next/image";
import React, {
    ReactNode,
    useEffect
} from "react"
import Link from "next/link";
import { ButtonLogout } from "@/components/buttonLogout";
import { usePathname, useRouter } from "next/navigation";
import { CheckCookies } from "@/hooks/CheckCookies";
import { withAuth } from "@/utils/withAuth";

interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {

    const pathname = usePathname();
    const router = useRouter();
    // Redirect logic to /admin/articles when /admin is accessed
    useEffect(() => {
        if (pathname === "/admin") {
            router.push("/admin/articles"); // Redirect to /admin/articles
        }
    }, [pathname, router]);

    const links = [
        { href: '/admin/articles', name: 'Article', icon: '/images/articles.svg' },
        { href: '/admin/category', name: 'Category', icon: '/images/category.svg' }
    ]

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="flex flex-col fixed z-10 bg-[#2563EB] w-[267px] px-4 min-h-screen">
                    {/* Header sidebar */}
                    <div className="flex flex-col">
                        {/* Logo */}
                        <div className="mt-6 flex justify-center items-center">
                            <Image src="/images/logoipsum-white.png" alt="logo-ipsum" width={134} height={24} priority />
                        </div>

                        <div className="flex flex-col mt-6">
                            {/* link (Category and Articles) */}
                            {links.map((link) => {
                                const isActive = pathname.startsWith(link.href)
                                return (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        className={`flex py-2 px-4 rounded-sm ${link.name === 'Category' && "mt-2"} ${isActive ? "bg-[rgba(255,255,255,0.25)]" : "hover:bg-[rgba(255,255,255,0.25)]"}`}
                                    >
                                        <Image src={link.icon} alt={link.name} width={20} height={20}
                                            unoptimized />
                                        <p className="text-white ml-1">{link.name}</p>
                                    </Link>
                                )
                            })}

                            <ButtonLogout />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col w-full ml-[267px] min-h-screen">
                    {children}
                </div>
            </div>
        </>
    )
}

export default withAuth(AdminLayout, ["Admin"]);