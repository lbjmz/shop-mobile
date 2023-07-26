<template>
    <div>
        <van-nav-bar title="订单确认页面" left-text="返回" left-arrow @click-left="$router.go(-1)" />
        <!-- <van-cell :title="defaultAddr === '' ? '默认收货地址' : defaultAddr" is-link to="addressList" /> -->
        <van-contact-card type="edit" :name="defaultAddr === '' ? '' : addresslist[0].receiver + '' + addresslist[0].mobile"
            :tel="defaultAddr === '' ? '默认收货地址' : defaultAddr" @click="() => {
                $router.push('/addressList')
            }" />

        <div v-for="shop in shopCartInfo.shopCartOrders" :key="shop.shopId">
            <van-row v-for="items in shop.shopCartItemDiscounts[0].shopCartItems" :key="items.basketId">
                <van-col span="22">
                    <span class="shop-name">{{ shop.shopName }}</span>
                    <van-card :num="items.prodCount" :price="items.price + '.00'" :desc="items.skuName"
                        :title="items.prodName" :thumb="items.pic">
                        <template #footer>
                            <van-stepper :value="items.prodCount" disabled integer />
                            <span class="goods">邮费 : {{ shop.transfee }}元</span>
                        </template>
                    </van-card>
                </van-col>
            </van-row>
            <van-cell-group>
                <van-field v-model="shop.remarks" label="订单备注" placeholder="请输入用户名" />
            </van-cell-group>
        </div>

        <van-coupon-cell :coupons="[]" />
        <div style="height:1rem;background-color:#fafafa"></div>
        <div class="pay-money">
            <van-cell-group>
                <van-cell title="总金额" :value="shopCartInfo.total">
                    <template #default>
                        <div>

                        </div>
                    </template>
                </van-cell>
                <van-cell title="优惠金额" :value="shopCartInfo.orderReduce" />
                <van-cell title="优惠金额" :value="shopCartInfo.total" />
                <van-cell title="商品总数" :value="shopCartInfo.totalCount" />
                <van-cell title="支付金额">
                    <template #default>
                        <div class="money-prod">
                            {{ shopCartInfo.actualTotal }}
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { addressList } from '@/api/address'
import { payrs } from '@/api/pay'
import { confirm, submit } from "@/api/prodinfo";
export default {
    data() {
        return {
            defaultAddr: '',
            addresslist: [],
            comfirm: {},
            shopCartInfo: [],
            submitData: {
                orderShopParam: []
            }
        }
    },
    created() {
        this.confirm = JSON.parse(sessionStorage.getItem("confirm"))
        this.init()
        //console.log( this.confirm)
    },
    // beforeRouteEnter(to, from, next) {
    //    const path = from.path
    //    if(!(path==='/'||path==='/addressList'||path==='sumbit-order'))
    // 
    //     sessionStorage.setItem("addrback", from.fullpath)
    //     next()
    // },
    methods: {
        async onSubmit() {
            const CartInfo = this.shopCartInfo.shopCartOrders
            for (let i = 0; i < CartInfo.length; i++) {
                this.submitData.orderShopParam.push({
                    shopId: CartInfo[i].shopId,
                    remarks: CartInfo[i].remarks,
                })
            }
            const result = await submit(this.submitData)
            const payre = await payrs({
                orderNumbers: result.orderNumbers,
                payType: 1
            })
            Dialog.alert({
                title: '购买成功',
                message: '恭喜您购买成功',
                theme: 'round-button',
            }).then(() => {
              this.$router.push('/me')
            });
            // console.log(payre)
        },
        async init() {
            this.addresslist = await addressList();
            for (const key in this.addresslist) {
                if (Object.hasOwnProperty.call(this.addresslist, key)) {
                    if (this.addresslist[key].commonAddr === 1) {
                        this.confirm.addrId = this.addresslist[key].addrId
                        const result = this.addresslist[key]
                        this.defaultAddr = result.province + " " + result.city + " " + result.area + " " + result.addr
                    }
                }
            }
            const temp = await confirm(this.confirm)
            // console.log(this.shopCartOrders)
            temp.shopCartOrders.map(item => item.remarks = '')
            this.shopCartInfo = temp
        }
    }

}
</script>

<style lang="less" scoped>
.van-cell__value {
    text-align: right;
}

.money-prod {
    color: red;
}

.pay-money {
    // text-align: center;
}

.shop-name {
    text-align: left;

}

.van-contact-card {
    padding: 1rem;
    margin-bottom: 1rem;
}

.van-card:not(:first-child) {
    // margin-left: 1rem;
}

.van-col--22 {
    // text-align: center;
}
</style>