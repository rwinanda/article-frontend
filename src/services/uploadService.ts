import { TokenAPI } from "@/hooks/TokenAPI";
import baseURL from "./base-api/api";
import { UploadResp } from "@/types/uploadTypes";

export const UploadAPI = async (data: FormData): Promise<UploadResp> => {
    try {
        const token = TokenAPI();

        const res = await baseURL.post("/upload", data , {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        console.log("Respon upload image => ", res.data)

        return res.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}