import { post, get } from "../utils/request";
/**
 * 所有的url地址必须封装在api里面
 * 不允许把url字符串卸载页面逻辑里面
 * 登录接口
 * @param {*} data
 * @returns
 */
export const login = (data) => post("/login", data);
export const register = (data) => post("/user/register", data);
export const myOrder = (data) => get("/p/myOrder/myOrder",data);
export const orderCount = (data) => get("/p/myOrder/orderCount",data);