import { post, get ,deleted} from "../utils/request";

export const totalPay = (data) => post("p/shopCart/totalPay",data);
export const shopCartInfo = (data) => post("/p/shopCart/info",data);
export const prodCount = () => get("/p/shopCart/prodCount");
export const changeItem = (data) => post("/p/shopCart/changeItem",data);
export const deleteAll = (data) => deleted("/p/shopCart/deleteAll", data)
export const deleteItem = (data) => deleted("/p/shopCart/deleteItem", data)
