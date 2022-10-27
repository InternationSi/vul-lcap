/*
 * @Author: sfy
 * @Date: 2022-10-14 23:10:12
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 22:08:17
 * @FilePath: /vulture/packages/vul-admin/src/request/module.ts
 * @Description: update here
 */

import Api from "../api";
import { API_URL } from "@/api/env";
import type { Moduletype } from "../views/moduleEditor/moduleEdit.type";

/**
 * @name: 查询单个模型的信息
 * @namespaceName 命名空间名称
 * @moduleName 模型名称
 * @return {*}
 */

export const moduleFind = async (
  namespaceName: string,
  moduleName: string
): Promise<any> => {
  const res = await Api.request({
    method: "get",
    url: `${API_URL}/${namespaceName}/module/${moduleName}`
  });
  return res;
};
//
//添加一个模块
export const addModule = async (
  namespaceName: string,
  moduleName: string,
  params: Moduletype
): Promise<any> => {
  const res = await Api.request({
    method: "post",
    url: `${API_URL}/${namespaceName}/module/${moduleName}`,
    data: params
  });
  return res;
};
