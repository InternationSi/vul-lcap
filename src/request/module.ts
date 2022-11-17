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
import type {
  Moduletype,
  moduleField,
  updateModule
} from "../views/moduleEditor/moduleEdit.type";

/**
 * @name: 查询单个模型的信息
 * @namespaceName 命名空间名称
 * @moduleName 模型名称
 * @return {*}
 */
export const getModule = async (namespaceName: string): Promise<any> => {
  const res = await Api.request({
    method: "get",
    url: `${API_URL}/${namespaceName}/module`
  });
  return res;
};

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

//添加一个模块
export const addModule = async (params: Moduletype): Promise<any> => {
  const res = await Api.request({
    method: "post",
    url: `${API_URL}/business/module_meta`,
    data: params
  });
  return res;
};

//查询模型中所有数据
export const getModuleList = async (): Promise<any> => {
  const res = await Api.request({
    method: "get",
    url: `${API_URL}/business/module_meta`
  });
  return res;
};
//添加模块属性
export const addModuleField = async (
  namespaceName: string,
  moduleName: string,
  fieldName: string,
  params: moduleField
): Promise<any> => {
  const res = await Api.request({
    method: "post",
    url: `${API_URL}/${namespaceName}/module/${moduleName}/field/${fieldName}`,
    data: params
  });
  return res;
};
//更新模块表格中属性
//localhost:3001/metaData/{namespaceName}/module/{moduleName}/field/{fieldName}
export const updateModuleField = async (
  namespaceName: string,
  moduleName: string,
  fieldName: string,
  params: updateModule
): Promise<any> => {
  const res = await Api.request({
    method: "put",
    url: `${API_URL}/${namespaceName}/module/${moduleName}/field/${fieldName}`,
    data: params
  });
  return res;
};
