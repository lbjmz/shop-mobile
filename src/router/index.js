import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Me from "../views/Me.vue";
import Home from "../views/Home.vue";
import CateGory from "../views/CateGory.vue";
import ShopCart from "../views/ShopCart.vue";
import ProdInfo from "../views/ProdInfo.vue";
import Layout from "../components/Layout.vue";
import AddressList from '../views/AddressList.vue'
import SumitOrderInfo from '../views/SumbitOrderInfo.vue'
import MyOrder from '../views/MyOrder.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/myOrder",
    name: "myOrder",
    component: MyOrder,
  },
  {
    path: "/prodInfo",
    name: "prodInfo",
    component: ProdInfo,
  },
  {
    path: "/addressList",
    name: "addressList",
    component: AddressList,
    
  },
  {
    path: "/submit-order",
    name: "submit-order",
    component: SumitOrderInfo,
    
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/me",
        name: "me",
        component: Me,
      },
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/cateGory",
        name: "cateGory",
        component: CateGory,
      },
      {
        path: "/shopCart",
        name: "shopCart",
        component: ShopCart,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
