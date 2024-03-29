import { http } from "@/utils/http";

/** 获取所有字典 */
export const getDict = (params?: any) => {
  return http.request("get", "https://egg-tool.hahake.cn/dict/list", {
    params
  });
};

/** 新增字典 */
export const addDict = (data?: any) => {
  return http.request("post", "https://egg-tool.hahake.cn/dict", { data });
};

/** 修改字典 */
export const updateDict = (data?: any) => {
  return http.request("put", `https://egg-tool.hahake.cn/dict/${data._id}`, {
    data
  });
};

/** 删除字典 */
export const removeDict = (data?: any) => {
  return http.request("delete", `https://egg-tool.hahake.cn/dict/${data.id}`, {
    data
  });
};

// 获取字典所有type
export const getDictType = () => {
  return http.request("get", "https://egg-tool.hahake.cn/dict/type");
};
