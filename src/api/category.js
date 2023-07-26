import { post, get } from "../utils/request";
export const getCategoryById = (data) => get("/prod/pageProd",data);
export const categoryInfo = (data) => get("/category/categoryInfo",data);
