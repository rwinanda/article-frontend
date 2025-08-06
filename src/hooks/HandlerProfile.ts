import { GetProfileAPI } from "@/services/authService";
import { ProfileResponse } from "@/types/authTypes";
import { Dispatch, SetStateAction } from "react";

export const HandlerProfile = async (setDataState: Dispatch<SetStateAction<ProfileResponse>>) => {
    try {
        const res = await GetProfileAPI();
        setDataState(res)
    } catch (e) {
        console.error(e)
    }
}
