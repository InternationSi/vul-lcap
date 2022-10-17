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
    url: `${API_URL}/namespaces`,
  });

  return res;
};

export const addNameSpaces = async (params: NsType) => {
  const res: any = await Api.request({
    method: "post",
    url: `${API_URL}/namespaces`,
    data: params,
  });

  return res;
};

export const editNameSpaces = async (params: NsType) => {
  const res: any = await Api.request({
    method: "put",
    url: `${API_URL}/namespaces`,
    data: params,
  });

  return res;
};

export const deletNameSpaces = async (namespacesName: string) => {
  const res: any = await Api.request({
    method: "delete",
    url: `${API_URL}/namespaces`,
    params: {
      namespacesName,
    },
  });

  return res;
};
