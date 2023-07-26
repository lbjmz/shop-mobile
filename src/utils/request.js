import axios from "axios";
import axiosRetry from "axios-retry";
import { Promise } from "core-js";
import { Notify } from "vant";
//发生异常的情况自动再次发送请求
axiosRetry(axios, {
  retries: 3, //请求失败重试次数
  retryDelay: (retryCount) => {
    return retryCount * 2000; //延迟请求 防止短时间内发送太频繁
  },
  shouldResetTimeout: true,
  // retryCondition:(error)=>{
  //     return true
  // }
});

const config = {
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  baseURL: process.env.VUE_APP_URL,
  // timeout: 3000,
};
const ajax = axios.create(config);
/**
 * 前后端基本都是jwt鉴权
 * 需要再发送请求的时候在Header里面携带token
 */
//配置请求拦截器
ajax.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 *响应拦截器 返回页面数据
 * 把ajax其他的不相关的数据 过滤掉
 */
//响应拦截器 返回页面数据
ajax.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === "00000") {
      if (data.msg === "添加成功" || data.msg === "ok") Notify(data.msg);
      return data.data;
    }
    if (data.code === "A00004") {
      Notify({ type: "danger", message: "需要登录才能浏览" });
      window.$router.push("/login");
      return Promise.reject("当前页面需要登录!");
    }
    Notify(data.msg);
    return Promise.reject(data.msg);
  },
  (error) => {
    return Promise.reject(error);
  }
);

//console.log(process.env.VUE_APP_URL);
const post = (url, data) => ajax.post(url, data);
const get = (url, data) => ajax.get(url, { params: data });
const put = (url, data) => ajax.put(url, data);
const deleted = (url, data) =>
  ajax.request({
    url: url,
    method: "delete",
    data: data,
  });
export { post, get, put, deleted };
