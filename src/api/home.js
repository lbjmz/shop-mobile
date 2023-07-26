import { post, get } from "../utils/request";
export const indexImgs = () => get("/indexImgs");
export const noticeList = () => get("/shop/notice/noticeList");
export const tagProdList = () => get("/prod/tagProdList");