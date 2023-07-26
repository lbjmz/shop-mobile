import { post, get } from "../utils/request";
export const prodInfo = (data) => get("/prod/prodInfo",data);
export const prodCommData = (data) => get("/prodComm/prodCommData",data);
export const submit = (data) => post("/p/order/submit", data)
export const isCollection = (data) => get("/p/user/collection/isCollection",data);
export const confirm = (data) => post("/p/order/confirm",data);
export const changeItem = (data) => post("/p/shopCart/changeItem",data);
export const addOrCancel = (data) => post("/p/user/collection/addOrCancel",data);
