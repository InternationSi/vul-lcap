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
    url: `${API_URL}/${namespaceName}/module/${moduleName}`,
  });
  return res;
};
