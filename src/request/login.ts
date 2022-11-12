import Api from "../api";
import { API_URL } from "@/api/env";
//登录
export const handleLogin = async (
    data: object = {}
): Promise<any> => {
    const res = await Api.request({
        method: "post",
        url: `${API_URL}/auth/login`,
        data,
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
          }
    });
    return res;
};