import { http } from "@/utils/http";
import { message } from "@/utils/message";

// type Result = {
//   data: Array<any>;
// };
type Method = "PUT" | "POST" | "GET" | string;

type ProxyParams = {
  method: Method;
  body: object;
  url: string;
  queryParams: object;
  header: object;
};
export type LogItem = {
  id: string;
  deviceId: string;
  userName: string;
};

type RequestLog = {
  code: string;
  data:
    | {
        records: LogItem[] | any[];
      }
    | any;
  msg: string;
};

// TODO 这个地方统一做代理拦截 包括报错的处理
async function proxy<Type>({
  url = "",
  body = {},
  queryParams = {},
  header = {},
  method
}: Partial<ProxyParams>) {
  const data = await http.request<any>(
    "post",
    `/proxy`,
    {
      data: { queryParams, header, url, body, method }
    },
    {
      beforeResponseCallback(res) {
        const { data } = res;
        if (data.code && data.code == "400") {
          message(data.msg, { type: "error", duration: 2000 });
          throw Error(data.msg);
        }
      }
    }
  );
  return new Promise<Type>(resolve => {
    resolve(data);
  });
}

/**
 * @description: 分页
 * @param {*} param1
 * @return {*}
 */
export const getRequestLog = params => {
  return proxy<RequestLog>({
    url: "https://navs.huidatech.cn/navs/bg/requestLog",
    queryParams: params
  });
};

/**
 * @description:单位接口(方案一：省市县逐级调用)
 * @param {string}  单位ID
 * @return {*}
 */
export const getDeptById = (depId: string | number) => {
  return proxy({
    url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryNext&id=${depId}`
  });
};

type WorkInfo208 = {
  jsonObject: [list: []] | any[];
};

/**
 * @description: 历史作业面积接口
 * @param {string} deviceId
 * @return {*}
 */
export const queryWorkInfoDetailBy208 = (deviceId: string) => {
  return proxy<WorkInfo208>({
    url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryWorkinfoDetailBy208&deviceId=${deviceId}`
  });
};

/**
 * @description:获取所有depId
 * @return {*}
 */
export const getAllDepIds = () => {
  return proxy({
    url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryAllDept`
  });
};

/**
 * @description: 录入设备接口
 * @param {*} params
 * @return {*}
 */
export const savePrecisionWork = params => {
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/${params.id}/push`,
    body: params
  });
};

/**
 * @description: 获取最后一次上点位置
 * @param {*} params
 * @return {*}
 */
export const queryCarInfoByDeviceId = deviceId => {
  return proxy({
    method: "GET",
    url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryCarInfoByDeviceId&deviceId=${deviceId}`
  });
};

export const findByPageConditionByDeviceId = deviceId => {
  return http.request(
    "get",
    `http://mes.huidatech.cn:8090/hd_product/pack/findByPageCondition?queryParams=${deviceId}&page=1&rows=10`
  );
};

/**
 * @description: 分页
 * @param {*} param1
 * @return {*}
 */
export const getDeptList = params => {
  return proxy({
    url: "https://navs.huidatech.cn/navs/bg/audit/deviceInfo",
    queryParams: params
  });
};

// 白名单
/**
 * @description: 修改白名单状态
 * @param {*} params
 * @return {*}
 */
export const saveWhite = params => {
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/whiteDevice/${params.deviceId}`,
    queryParams: params
  });
};

/**
 * @description: 分页
 * @param {*} param1
 * @return {*}
 */
export const getWhiteList = params => {
  return proxy({
    url: "https://navs.huidatech.cn/navs/bg/audit/whiteDevice",
    queryParams: params
  });
};

/**
 * @description: 最后一次点
 * @param {*} param1
 * @return {*}
 */
export const getLastPoint = deviceId => {
  return proxy({
    url: `http://data.linkio.cn:8080/v1/trace/lastPoint?clientId=c${deviceId}&format=json`
  });
};

/**
 * @description: 获取历史作业亩数
 * @param {*} param1
 * @return {*}
 */
export const getSumByYear = deviceId => {
  return proxy({
    url: `http://data.linkio.cn/v1/navigation-work-sum-by-year?clientId=c${deviceId}`
  });
};

// 根据经纬度查询地址
export const geoToAddress = (lat, lng) => {
  console.log(lat, lng);

  return proxy({
    url: `http://api.map.baidu.com/geocoder/v2/?ak=H4WdQ7qMi38olkGXlo1ZCM0OgY09Hjfx&location=${lng},${lat}&output=json&pois=1`
  });
};

export const queryNext = parentId => {
  return proxy({
    url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryNext&id=${parentId}`
  });
};

/**
 * @description: 三方联系分页
 * @param {*} param1
 * @return {*}
 */
export const getRelationDevicePlatform = params => {
  return proxy({
    url: "https://navs.huidatech.cn/navs/bg/audit/platform",
    queryParams: params
  });
};

/**
 * @description: 新增三方关联
 * @param {*} params
 * @return {*}
 */
export const saveRelationDevicePlatform = params => {
  const temp = { ...params };
  if (temp.platforms) {
    temp.platforms = params.platforms.join(",");
    temp.deviceIds = params.deviceId;
  }
  return proxy({
    method: "POST",
    url: `https://navs.huidatech.cn/navs/bg/audit/platform`,
    body: temp
  });
};

/**
 * @description: 修改三方关联
 * @param {*} params
 * @return {*}
 */
export const updateRelationDevicePlatform = params => {
  const temp = { ...params };
  if (temp.platforms) {
    temp.platforms = params.platforms.join(",");
  }
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/platform/${params.id}`,
    body: temp
  });
};

// export const updateAllPay= deviceId => {
//   return proxy({
//     method: "put",
//     url: `http://zyc.huidatech.cn/PrecisionWork/action/app?handler=queryCarInfoByDeviceId&deviceId=${deviceId}`
//   });
// };

/**
 * 更新是否允许支付
 * @param enable id
 * @returns
 */
export const updateAllowPay = params => {
  const temp = { ...params };
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/${params.id}/allowPay`,
    body: temp
  });
};

/**
 * 更新结束时间
 * @param params increaseDay id
 * @returns
 */
export const updateEndDate = params => {
  const temp = { ...params };
  //   increaseDay;
  // deviceInfoId;
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/${params.id}/updateEndDate`,
    body: temp
  });
};

export const syncDeviceInfo = params => {
  const temp = { ...params };
  //   deviceIds;
  return proxy({
    method: "PUT",
    url: `https://navs.huidatech.cn/navs/bg/audit/deviceInfo/sync`,
    body: temp
  });
};

/**
 * 获取导航信息 id
 * @param params
 * @returns
 */
export const getNavInfo = params => {
  const temp = { ...params };
  //   increaseDay;
  // deviceInfoId;
  return proxy<{ data: any }>({
    method: "GET",
    url: `https://navs.huidatech.cn/navs/bg/audit/${params.id}/original`,
    body: temp
  });
};
