"use client";

import { LoginApi } from "@/services/authService";
import { FormLogin, LoginPayload } from "@/types/authTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SchemaLogin } from "@/hooks/zoodForm/SchemaAuth";
import { CheckCookies } from "@/hooks/CheckCookies";
import ButtonLoading from "@/components/loading/ButtonLoading";

const LoginPages = () => {
    const [dataLogin, setDataLogin] = useState<LoginPayload>({
        username: "",
        password: ""
    });
    const [failedLogin, setFailedLogin] = useState(false);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handlerLogin = async () => {
        try {
            setLoading(true);
            const res = await LoginApi(dataLogin);
            const token = res.token
            const role = res.role;
            // Save token in SessionStorage
            sessionStorage.setItem('token', token);
            if (role === "Admin") {
                router.push("/admin/articles");
            } else if (role === "User") {
                router.push("/")
            }

        } catch (error) {
            console.log(error);
            setFailedLogin(true);
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlerLogin()
        }
    }

    // Setup form validation
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<FormLogin>({
        resolver: zodResolver(SchemaLogin)
    });

    return (
        <>
            <CheckCookies />
            <div className="flex flex-col w-full min-h-screen items-center justify-center bg-[#F2F2F2]">
                <div className="flex flex-col bg-[#FFFFFF] rounded-lg border-1 border-[#5c9bec] px-4 w-[400px] h-max py-10">
                    <div className="flex flex-col">
                        {/* Logo */}
                        <div className="mb-4 flex justify-center items-center">
                            <Image src="/images/logoipsum.png" alt="logo-ipsum" width={134} height={24} priority />
                        </div>

                        {/* username */}
                        <div className="flex flex-col mt-4">
                            <p>
                                Username
                            </p>
                            <input
                                {...register('username')}
                                type="text"
                                placeholder="Input Username"
                                className={`
                                ${failedLogin && "border-red-400 outline-red-700"}
                                w-full px-4 py-2 mt-1 border-[#E2E8F0] outline-[#0065eb] border-2 rounded-sm
                                `}
                                onChange={(e) => {
                                    const currData = dataLogin;
                                    currData.username = e.target.value;
                                    setDataLogin(currData)
                                }}
                            />
                            {
                                (errors.username &&
                                    <p className="text-red-500">{errors.username.message}</p>)
                            }
                        </div>

                        {/* Password */}
                        <div className="flex flex-col mt-4">
                            <p>
                                Password
                            </p>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Input Password"
                                className={
                                    `${failedLogin && "border-red-400 outline-red-700"}
                                w-full px-4 py-2 mt-1 border-[#E2E8F0] outline-[#0065eb] border-2 rounded-sm`
                                }
                                onChange={(e) => {
                                    const currData = dataLogin;
                                    currData.password = e.target.value;
                                    setDataLogin(currData)
                                }}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            {
                                (errors.password && <p className="text-red-500">{errors.password.message}</p>) ||
                                (
                                    failedLogin &&
                                    <p className="text-red-500">
                                        Username or Password are Incorect
                                    </p>
                                )
                            }
                        </div>

                        {/* Button */}
                        <button
                            className="bg-[#2563EB] hover:bg-[#195be9] flex items-center justify-center mt-4 py-2 rounded-sm w-full font-semibold text-white hover:text-gray-100 cursor-pointer transition-transform duration-300"
                            onClick={handleSubmit(handlerLogin)}
                        >
                            {loading ? <ButtonLoading /> : "LOG IN"}
                        </button>
                    </div>

                    {/* Register */}
                    <div className="flex mt-4 items-center justify-center">
                        <p
                            className="text-[#475569]">
                            Dont have a account?
                        </p>
                        <Link
                            href="/register"
                            className="ml-2 text-[#5c9bec] hover:text-[#0065eb] font-semibold underline underline-offset-2"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPages;
