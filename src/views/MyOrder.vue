<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-nav-bar title="订单列表" left-text="返回" left-arrow @click-left="$router.go(-1)" />
            <van-tabs v-model="active" @click="clickTabs">
                <van-tab title="待付款">
                    <div @click="payNow(order)" v-for="(order, index) in orders.records" :key="index">
                        <div class="order-list">
                            <van-card v-for="(item, index) in order.orderItemDtos" :num="item.prodCount" :price="item.price"
                                :desc="item.skuName" :title="item.proName" :thumb="item.pic" :key="index" />
                        </div>
                        <van-cell title="订单号" :value="order.orderNumber" :label="'￥' + order.actualTotal" />
                    </div>
                </van-tab>

                <van-tab title="待发货">
                    <div v-for="(order, index) in orders.records" :key="index">
                        <div class="order-list">
                            <van-card v-for="(item, index) in order.orderItemDtos" :num="item.prodCount" :price="item.price"
                                :desc="item.skuName" :title="item.proName" :thumb="item.pic" :key="index" />
                        </div>
                        <van-cell title="订单号" :value="order.orderNumber" :label="'￥' + order.actualTotal" />
                    </div>
                </van-tab>

                <van-tab title="待收货">
                    <div v-for="(order, index) in orders.records" :key="index">
                        <div class="order-list">
                            <van-card v-for="(item, index) in order.orderItemDtos" :num="item.prodCount" :price="item.price"
                                :desc="item.skuName" :title="item.proName" :thumb="item.pic" :key="index" />
                        </div>
                        <van-cell title="订单号" :value="order.orderNumber" :label="'￥' + order.actualTotal" />
                    </div>
                </van-tab>

                <van-tab title="待评价">
                    <div v-for="(order, index) in orders.records" :key="index">
                        <div class="order-list">
                            <van-card v-for="(item, index) in order.orderItemDtos" :num="item.prodCount" :price="item.price"
                                :desc="item.skuName" :title="item.proName" :thumb="item.pic" :key="index" />
                        </div>
                        <van-cell title="订单号" :value="order.orderNumber" :label="'￥' + order.actualTotal" />
                    </div>
                </van-tab>
            </van-tabs>
        </van-list>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import { myOrder } from '@/api/user'
// import { confirm, submit } from "@/api/prodinfo";
import { payrs } from '@/api/pay'
export default {
    data() {
        return {
            active: 0,
            loading: false,
            finished: false,
            orders: {
                records: []
            },
            fatch: {
                current: 1,
                status: 1,
            }
        }
    },
    async created() {
        this.loadData()
    },
    methods: {
        clickTabs() {
            this.fatch.current = 1
            this.finished = false
            this.orders.records = []
            this.loadData()
        },
        onLoad() {
            console.log(1)
            this.fatch.current = this.fatch.current + 1
            this.loadData()
        },
        async payNow(order) {
            const payre = await payrs({
                orderNumbers: order.orderNumber,
                payType: 1
            })
            Dialog.alert({
                title: '购买成功',
                message: '恭喜您支付成功',
                theme: 'round-button',
            }).then(() => {
                this.loadData()
            });
        },
        async loadData() {
            this.fatch.status = this.active + 1
            const result = await myOrder(this.fatch)
            if (result.records.length > 0) {
                this.orders.records = [...result.records]
            }
            if (result.current >= result.pages) {
                this.finished = true
            }
            this.loading = false
        }
    },

}
</script>
<style lang="less" scoped>
.order-list {
    padding: 1rem;
}
</style>