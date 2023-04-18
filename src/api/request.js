import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
import store from "@/store";

// 一般接口请求
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
});

// 请求前拦截
request.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${store.getters.token}`;
  let { data = {}, method } = config;
  if (method === "post" && Object.prototype.toString.call(data) === "[object FormData]") {
    // 添加公共参数 start
    // 添加公共参数 end
  } else {
    data = { ...data };
    // 添加公共参数 start

    // 添加公共参数 end
    Object.keys(data).forEach((item) => {
      if (data[item] === undefined || data[item] === null || data[item] === "") {
        delete data[item];
      }
    });
    config.data = data;
    if (method === "get") {
      config.params = data;
    }
  }
  return config;
});

// 请求成功回调
function successCallback(response) {
  if (Object.prototype.toString.apply(response.data) === "[object Blob]") {
    return response.data;
  }
  let res = response.data;
  let { data, code, message } = res;
  switch (code) {
    case 2000:
      return data;
    case 4001:
      router.push({ path: "/login" });
      break;
    case 4003:
    case 4004:
    case 5000:
      Message.error(message);
      return Promise.reject(res);
    default:
      break;
  }
}
// 请求错误回调
function errorCallback(error) {
  Message.error(
    error.response
      ? `网络请求错误，错误码:${error.response.code}`
      : `网络请求超时！请稍后重试,或联系技术人员!`
  );
  return Promise.reject(error);
}
// 响应拦截
request.interceptors.response.use(successCallback, errorCallback);

export default request;
