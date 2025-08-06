"use client";

import { SchemaRegist } from "@/hooks/zoodForm/SchemaAuth";
import { LoginApi, SignupAPI } from "@/services/authService";
import { FormRegist, RegisterPayload } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPages = () => {
    const [dataRegist, setDataRegist] = useState<RegisterPayload>({
        username: "",
        password: "",
        role: ""
    });
    const [failedRegist, setFailedRegist] = useState(false);

    const dataRole = ["User", "Admin"]

    const router = useRouter();

    const registerHandler = async () => {
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

    // Setup form validation
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<FormRegist>({
        resolver: zodResolver(SchemaRegist)
    })

    return (
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
                        <input
                            {...register('username')}
                            type="text"
                            placeholder="Input Username"
                            className={`
                                ${failedRegist && "border-red-400 outline-red-700"}
                                w-full px-4 py-2 mt-1 border-[#E2E8F0] outline-[#0065eb] 
                                border-2 rounded-sm
                                `}
                            onChange={(e) => {
                                const curentData = dataRegist;
                                curentData.username = e.target.value;
                                setDataRegist(curentData);
                            }}
                        />
                        {
                            (
                                errors.username && <p className="text-red-500">{errors.username.message}
                                </p>
                            ) ||
                            (
                                failedRegist &&
                                <p className="text-red-500">
                                    Username already registered
                                </p>
                            )
                        }
                    </div>

                    {/* Password */}
                    <div className="flex flex-col mt-3">
                        <p className="font-medium">
                            Password
                        </p>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Input Password"
                            className={`w-full px-4 py-2 mt-1 border-[#E2E8F0] outline-[#0065eb] border-2 rounded-sm`}
                            onChange={(e) => {
                                const curentData = dataRegist;
                                curentData.password = e.target.value;
                                setDataRegist(curentData);
                            }}
                        />
                        {
                            (
                                errors.password &&
                                <p className="text-red-500">
                                    {errors.password.message}
                                </p>
                            )
                        }
                    </div>

                    {/* Role */}
                    <div className="mt-4">
                        <label>
                            Role
                        </label>
                        <select
                            className="w-full px-4 py-2 text-gray-900 bg-white border border-[#E2E8F0] hover:border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                                const curentData = dataRegist;
                                curentData.role = e.target.value;
                                setDataRegist(curentData);
                            }}
                        >
                            {dataRole.map((role, indexRole) => (
                                <option
                                    key={indexRole}
                                    value={role}
                                >
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        className="bg-[#2563EB] hover:bg-[#195be9] flex items-center justify-center mt-4 py-2 rounded-sm w-full font-semibold text-white hover:text-gray-100 cursor-pointer transition-transform duration-300"
                        onClick={handleSubmit(registerHandler)}
                    >
                        Register
                    </button>
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
    );
};

export default RegisterPages;
