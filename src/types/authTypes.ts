import { SchemaLogin, SchemaRegist } from "@/hooks/zoodForm/SchemaAuth"
import z from "zod"

export type RegisterPayload = {
    username: string,
    password: string,
    role: string
}

export type LoginPayload = {
    username: string,
    password: string,
}

export type ProfileResponse = {
    id: string,
    username: string,
    role: string
}

export type LoginResponse = {
    token: string,
    role: string
}

export type FormRegist = z.infer<typeof SchemaRegist>;
export type FormLogin = z.infer<typeof SchemaLogin>;
