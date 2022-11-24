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
  ModuleType,
  ModuleField
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
export const addModule = async (params: ModuleType): Promise<any> => {
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
//编辑模型数据
export const editModuleList = async (
  params: ModuleType,
  id: string
): Promise<any> => {
  const res = await Api.request({
    method: "patch",
    url: `${API_URL}/business/module_meta/${id}`,
    data: params
  });
  return res;
};
//删除模型数据
export const deleteModule = async (id: string): Promise<any> => {
  const res = await Api.request({
    method: "delete",
    url: `${API_URL}/business/module_meta/${id}`
  });
  return res;
};
//查询所有模块中属性
export const getModuleField = async (): Promise<any> => {
  const res = await Api.request({
    method: "get",
    url: `${API_URL}/business/field_meta`
  });
  return res;
};
//添加模块属性
export const addModuleField = async (params: ModuleField): Promise<any> => {
  const res = await Api.request({
    method: "post",
    url: `${API_URL}/business/field_meta`,
    data: params
  });
  return res;
};
//更新模块属性
export const updateModuleField = async (
  params: ModuleField,
  id: string
): Promise<any> => {
  const res = await Api.request({
    method: "patch",
    url: `${API_URL}/business/field_meta/${id}`,
    data: params
  });
  return res;
};
//删除一条模型属性

export const deleteModuleField = async (
  params: ModuleField,
  id: string
): Promise<any> => {
  const res = await Api.request({
    method: "delete",
    url: `${API_URL}/business/field_meta/${id}`,
    data: params
  });
  return res;
};
