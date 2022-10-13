import Api from "../api";

export const getNameSpaces = async () => {
  const res = await Api.request({
    method: "get",
    url: "/metaData/namespaces",
  });

  return res;
};
