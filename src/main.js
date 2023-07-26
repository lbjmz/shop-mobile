import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import {
  Image as VanImage,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
  Icon,
  Divider,
  Col,
  Row,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  TreeSelect,
  Tab,
  Form,
  NoticeBar,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Search,
  Grid,
  GridItem,
  Tag,
  Card,
  Empty,
  Stepper,
  Cell,
  CellGroup,
  ActionSheet,
  AddressEdit,
  AddressList,
  NavBar,
  ContactCard,
  CouponCell,
  CouponList,
  Tabs ,
  List
} from "vant";
Vue.use(List);
Vue.use(Tabs);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(AddressList);
Vue.use(NavBar);
Vue.use(AddressEdit);
Vue.use(Swipe);
Vue.use(Icon);
Vue.use(ActionSheet);
Vue.use(Divider);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Col);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Row);
Vue.use(Sku);
Vue.use(Checkbox);
Vue.use(Empty);
Vue.use(Card);
Vue.use(TreeSelect);
Vue.use(Tab);
Vue.use(Stepper);
Vue.use(Tag);
Vue.use(Grid);
Vue.use(CheckboxGroup);
Vue.use(NoticeBar);
Vue.use(GridItem);
Vue.use(Lazyload);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(SubmitBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(ContactCard);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
