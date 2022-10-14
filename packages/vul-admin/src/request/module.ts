/*
 * @Author: sfy
 * @Date: 2022-10-14 23:10:12
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-14 23:14:46
 * @FilePath: /vulture/packages/vul-admin/src/request/module.ts
 * @Description: update here
 */

import Api from "../api";

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
    url: `/metaData/${namespaceName}/module/${moduleName}`,
  });
  return res;
};
