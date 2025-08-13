"use client";

import { LoginApi } from "@/services/authService";
import { LoginPayload } from "@/types/authTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SchemaLogin } from "@/hooks/zoodForm/SchemaAuth";
import { CheckCookies } from "@/hooks/CheckCookies";
import ButtonLoading from "@/components/loading/ButtonLoading";
import InputAreaAuth from "@/components/form/InputAreaAuth";

const LoginPages = () => {
    const methods = useForm<LoginPayload>({
        resolver: zodResolver(SchemaLogin),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const [failedLogin, setFailedLogin] = useState(false);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handlerLogin = async (data: LoginPayload) => {
        try {
            setLoading(true);
            const res = await LoginApi(data);
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
    return (
        <>
            <CheckCookies />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handlerLogin)}>
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
                                    <InputAreaAuth field="username" type="text" placeholder="Input Username" failedLogin={failedLogin} />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col mt-4">
                                    <p>
                                        Password
                                    </p>
                                    <InputAreaAuth field="password" type="password" placeholder="Input Password" failedLogin={failedLogin} />
                                </div>

                                {/* Button */}
                                <button
                                    className="bg-[#2563EB] hover:bg-[#195be9] flex items-center justify-center mt-4 py-2 rounded-sm w-full font-semibold text-white hover:text-gray-100 cursor-pointer transition-transform duration-300"
                                    type="submit"
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
                </form>
            </FormProvider>
        </>
    );
};

export default LoginPages;
