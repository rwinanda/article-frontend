"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import InputAreaForm from "@/components/input-area/InputAreaForm";
import LabelRole from "@/components/label/LabelRole";
import { SchemaRegist } from "@/hooks/zoodForm/SchemaAuth";
import { LoginApi, SignupAPI } from "@/services/authService";
import { RegisterPayload } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPages = () => {
    const methods = useForm<RegisterPayload>({
        resolver: zodResolver(SchemaRegist),
        defaultValues: {
            username: "",
            password: "",
            role: ""
        },
    });
    const [failedRegist, setFailedRegist] = useState(false);

    const router = useRouter();

    const registerHandler = async (dataRegist: RegisterPayload) => {
        console.log("Data Regist => ", dataRegist)
        try {
            const res = await SignupAPI(dataRegist);
            console.log(res);
            const dataLogin = {
                username: dataRegist.username,
                password: dataRegist.password
            }
            await LoginApi(dataLogin)
            router.push("/login");

        } catch (error) {
            console.log(error);
            setFailedRegist(true)
            throw error
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(registerHandler)}>
                <div className="flex flex-col w-full min-h-screen items-center justify-center bg-[#F2F2F2]">
                    <div className="flex flex-col bg-[#FFFFFF] rounded-lg border-1 border-[#5c9bec] px-4 w-[400px] h-max py-10">
                        <div className="flex flex-col w-full">
                            {/* Logo */}
                            <div className="mb-4 flex justify-center items-center">
                                <Image src="/images/logoipsum.png" alt="logo-ipsum" width={134} height={24} priority />
                            </div>

                            {/* Username */}
                            <div className="flex flex-col w-full">
                                <p className="font-medium">
                                    Username
                                </p>
                                <InputAreaForm field="username" type="text" placeholder="Input Username" failedLogin={failedRegist} flag="registerPage" textFailed="Username already registered" />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col mt-3">
                                <p className="font-medium">
                                    Password
                                </p>
                                <InputAreaForm field="password" type="password" placeholder="Input Password" failedLogin={failedRegist} />
                            </div>

                            {/* Role */}
                            <LabelRole />

                            {/* Button */}
                            <ButtonPrimary text="REGISTER" type="submit" marginTop="mt-4" />
                        </div>


                        {/* Register */}
                        <div className="flex mt-4 items-center justify-center">
                            <p className="text-[#475569]">Already have an account?</p>
                            <Link
                                href="/login"
                                className="ml-2 text-[#5c9bec] hover:text-[#0065eb] font-semibold underline underline-offset-2"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>

    );
};

export default RegisterPages;