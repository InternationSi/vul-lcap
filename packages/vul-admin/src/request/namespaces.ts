import Api from "../api";
import type { NsType } from "../views/renameBlock/renameBlock.type";

export const getNameSpaces = async () => {
  const res: any = await Api.request({
    method: "get",
    url: "/metaData/namespaces",
  });

  return res;
};

export const addNameSpaces = async (params: NsType) => {
  const res: any = await Api.request({
    method: "post",
    url: "/metaData/namespaces",
    data: params,
  });

  return res;
};

export const editNameSpaces = async (params: NsType) => {
  const res: any = await Api.request({
    method: "put",
    url: "/metaData/namespaces",
    data: params,
  });

  return res;
};

export const deletNameSpaces = async (namespacesName: string) => {
  const res: any = await Api.request({
    method: "delete",
    url: "/metaData/namespaces",
    params: {
      namespacesName,
    },
  });

  return res;
};
