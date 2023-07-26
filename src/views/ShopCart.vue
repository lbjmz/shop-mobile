<template>
  <div class="shop-cart">
    <!-- <span>购物车</span> -->
    <van-search placeholder="搜索" shape="round" />
    <!-- <van-cell :title="默认收获地址"></van-cell> -->
    <van-cell :title="defaultAddr === '' ? '默认收货地址' : defaultAddr" is-link to="addressList" />
    <div style="height: 1rem"></div>
    <div class="cards-list">
      <van-checkbox-group v-model="basketIds" ref="checkboxGroup">
        <div v-for="shop in shopCartInfo" :key="shop.shopId">
          <van-row v-for="items in shop.shopCartItemDiscounts[0].shopCartItems" :key="items.basketId">
            <van-col span="2">
              <van-checkbox @click="basketClick" :name="items.basketId"></van-checkbox>
            </van-col>
            <van-col span="22">
              <span class="shop-name">{{ shop.shopName }}</span>
              <van-card :num="items.prodCount" :price="items.price + '.00'" :desc="items.skuName" :title="items.prodName"
                :thumb="items.pic">
                <template #tags>
                  <!-- <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag> -->
                </template>
                <template #footer>
                  <van-stepper :value="items.prodCount" async-change @change="(value) => {
                    if (items.prodCount === value) { return }
                    let count = 1
                    if (items.prodCount > value) {
                      count = -1;
                    }
                    onstepperChange(items, count, () => {
                      items.prodCount = value;
                      basketClick()
                    });
                  }" integer />
                </template>
              </van-card>
            </van-col>
          </van-row>
        </div>
      </van-checkbox-group>
    </div>

    <van-empty v-if="shopCartInfo <= 0" description="当前购物车为空" />

    <div style="height: 7rem"></div>
    <van-submit-bar :price="totalMoney" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="allProdSelected">全选</van-checkbox>
      <a v-if="basketIds.length > 0" @click="deleteCart">清空</a>
      <template #tip>
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
    <van-divider />
  </div>
</template>
<script>
import { submit } from '@/api/prodinfo'
import { addressList } from '@/api/address'
import { shopCartInfo, totalPay, deleteItem, changeItem } from "@/api/shopcart";
import emitter from "@/utils/mitt";
export default {
  data() {
    return {
      checked: false,
      shopCartInfo: [],
      totalPay: [],
      basketIds: [],
      value: 0,
      totalMoney: 0,
      addresslist: [],
      defaultAddr: "",
      defaultAddrId: 0,
      confirm: {
        basketIds: [],
        orderItem: {
          prodId: 0,
          skuId: 0,
          prodCount: 1,
          shopId: 0,
          distributionCardNo: "",
        },
        addrId: 0,
        userChangeCoupon: 0,
        couponIds: [],
      },
    };
  },
  created() {
    this.init()
  },
  methods: {
    onSubmit() {
      // for (let i = 0; i < this.basketIds; i++) {
      //   const cart = this.shopCartInfo[i].shopCartItemDiscounts[0].shopCartItems
      //   console.log(cart)
      //   for (let j = 0; j < cart.length; j++) {
      //     if (this.basketIds[i] !== cart[j].basketId) {
      //       break;
      //     }
      //     this.confirm.basketIds.push(cart[j].basketId)
      //     this.confirm.orderItem = {
      //       prodId: cart[j].prodId,
      //       skuId: cart[j].skuId,
      //       prodCount: cart[j].prodCount,
      //       shopId: cart[j].shopId,
      //       distributionCardNo: "",
      //     }
      //     this.confirm.addrId = this.defaultAddrId
      //   }
      // }
      // if (this.basketIds.length <= 0) return;
      this.confirm.basketIds = this.basketIds
      this.confirm.addrId = this.defaultAddrId

      sessionStorage.setItem("confirm",JSON.stringify(this.confirm))
      this.$router.push("/submit-order")
      console.log(this.confirm)
    },
    async init() {
      shopCartInfo({}).then(
        r => {
          this.shopCartInfo = r
          this.basketClick()
        }
      );
      this.addresslist = await addressList();

      for (const key in this.addresslist) {
        if (Object.hasOwnProperty.call(this.addresslist, key)) {
          if (this.addresslist[key].commonAddr === 1) {

            const result = this.addresslist[key]
            this.defaultAddr = result.province + " " + result.city + " " + result.area + " " + result.addr
          }
        }
      }
    },
    deleteCart() {
      deleteItem(this.basketIds).then(r => {
        this.init()
        emitter.emit('changeItem')
      })
      console.log(this.basketIds)
    },
    // callback 回调 放在第三个参数位置
    onstepperChange(items, value, callback) {
      changeItem({
        basketId: items.basketId,
        prodId: items.prodId,
        skuId: items.skuId,
        shopId: items.shopId,
        count: value,
        distributionCardNo: "",
      }).then(r => {
        callback()
        //发布事件
        emitter.emit('changeItem')
        // this.basketClick()
      })
    },
    allProdSelected() {
      // console.log(value);
      this.$refs.checkboxGroup.toggleAll(this.checked);
      this.basketClick()
    },
    async basketClick() {
      console.log(this.basketIds)
      const result = await totalPay(this.basketIds);
      // console.log(this.totalMoney = result.finalMoney)
      this.totalMoney = result.finalMoney * 100;
    },

    onClickEditAddress() { },
  },
};
</script>
<style lang="less">
.shop-cart {
  height: 100%;
  background-color: #fafafa;

  .van-submit-bar {
    bottom: 3.2rem;
  }

  .cards-list {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    background-color: #fff;

    .van-col--2 {
      margin-top: 5rem;
    }

    .van-col {
      .shop-name {
        display: inline-block;
        width: 100%;
        margin-top: 1rem;
        height: 2.5rem;
        text-align: left;
        font-weight: 600;
      }

      .van-card {
        background-color: #fff;
      }
    }
  }
}
</style>