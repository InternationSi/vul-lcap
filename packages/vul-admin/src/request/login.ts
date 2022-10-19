import Api from "../api";
import { API_URL } from "@/api/env";

//登录
export const handleLogin = async (
    data: object = {}
): Promise<any> => {
    const res = await Api.request({
        method: "post",
        url: `${API_URL}/user/login`,
        data
    });
    return res;
};