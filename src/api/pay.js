import {post,get,put,deleted} from '@/utils/request'

export const payrs = (data) => post("/p/order/pay",data);