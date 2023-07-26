import {post,get,put,deleted} from '@/utils/request'
export const addressList =(data)=>get("/p/address/list",data)

export const addAddr =(data)=>post("/p/address/addAddr",data)
export const updateAddr = (data) => put("/p/address/updateAddr", data)
export const listByPid = (data) => get("/p/area/listByPid", data)

export const deleteAddr = (data,bodyData) => deleted(`/p/address/deleteAddr/${data}`, bodyData)


export const defaultAddr = (data) => put(`/p/address/defaultAddr/${data}`, data)