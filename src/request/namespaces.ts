/*
 * @Author: sfy
 * @Date: 2022-10-17 21:56:34
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 22:09:12
 * @FilePath: /vulture/packages/vul-admin/src/request/namespaces.ts
 * @Description: update here
 */
import Api from "../api";
import { API_URL } from "@/api/env";
import type { NsType } from "../views/renameBlock/renameBlock.type";

export const getNameSpaces = async () => {
  const res: any = await Api.request({
    method: "get",
    url: `${API_URL}/business/namespace`
  });

  return res;
};
//添加
export const addNameSpaces = async (params: NsType) => {
  const res: any = await Api.request({
    method: "post",
    url: `${API_URL}/business/namespace`,
    data: params
  });

  return res;
};

export const editNameSpaces = async (id: string) => {
  const res: any = await Api.request({
    method: "put",
    url: `${API_URL}/namespaces/${id}`
  });

  return res;
};

export const deletNameSpaces = async (id: string) => {
  const res: any = await Api.request({
    method: "delete",
    url: `${API_URL}/business/namespace/${id}`
  });
  return res;
};
