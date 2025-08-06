import { LoginPayload, LoginResponse, ProfileResponse, RegisterPayload } from "@/types/authTypes";
import baseURL from "./base-api/api"
import { TokenAPI } from "@/hooks/TokenAPI";

// API For Login
export const LoginApi = async (data: LoginPayload): Promise<LoginResponse> => {
    try {
        const res = await baseURL.post("/auth/login",
            data
        );

        console.log("Respon login => ", res);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const SignupAPI = async (data: RegisterPayload) => {
    try {
        const res = await baseURL.post("/auth/register", data, {
            // withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log("Signup Respon => ", res);
        return res.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const GetProfileAPI = async (): Promise<ProfileResponse> => {
    try {
        const token = TokenAPI()

        const res = await baseURL.get("/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data
    } catch (error) {
        console.error()
        throw error;
    }
}