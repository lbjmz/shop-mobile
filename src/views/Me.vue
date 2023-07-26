<template>
  <div class="me">
    <!-- 头像 -->
    <div class="user-name">
      <van-image round width="5rem" height="5rem" :src="require('../assets/logo.png')" />
      <div style="margin-top: 0.4rem">
        <span> Cathy </span>
      </div>
    </div>

    <!-- 分割线 -->
    <van-divider :style="{ borderColor: '#f7f7fb', margin: '.2rem' }">
    </van-divider>
    <div>
      <div class="order">
        <div class="my-order">我的订单</div>
        <div class="order-all">查看全部</div>
        <van-icon name="arrow" color="#afafaf" />
      </div>
    </div>

    <van-divider :style="{ borderColor: '#f7f7fb', margin: '.1rem' }">
    </van-divider>

    <!-- 导航菜单 -->
    <div @click="$router.push('/myOrder')">
      <van-grid class="process" :border="false" icon-color="#00C5CD">
        <van-grid-item icon="credit-pay" :badge="myInfo.unPay" text="待支付" />
        <van-grid-item icon="guide-o" :badge="myInfo.payed" text="待发货" />
        <van-grid-item icon="records" :badge="myInfo.consignment" text="待签收" />
        <van-grid-item icon="sign" :badge="myInfo.success" text="已完成" />
      </van-grid>
    </div>

    <van-divider :style="{ borderColor: '#f7f7fb', margin: '.3rem' }">
    </van-divider>
    <van-grid class="user-details" :column-num="3" :border="false">
      <van-grid-item text="我的收藏"><span class="count">1</span>我的收藏</van-grid-item>
      <van-grid-item text="我的消息"><span class="count">5</span>我的消息</van-grid-item>
      <van-grid-item text="我的消息"><span class="count">3</span>我的足迹</van-grid-item>
    </van-grid>
    <van-divider :style="{ borderColor: '#f7f7fb', margin: '.3rem' }">
    </van-divider>

    <!-- 固定设置 -->
    <van-cell-group class="user-message">
      <van-cell title="分销中心" icon="cart-o" is-link title-style="font-size:0.9rem" />
      <van-cell title="领券中心" icon="ecard-pay" is-link title-style="font-size:0.9rem" />
      <van-cell title="我的优惠券" icon="coupon-o" is-link title-style="font-size:0.9rem" />
      <van-cell title="收货地址" icon="location-o" is-link title-style="font-size:0.9rem" to="addressList" />
    </van-cell-group>
    <van-divider :style="{ borderColor: '#f7f7fb', margin: '.5rem' }">
    </van-divider>
    
    <!-- 登出按钮 -->
    <van-button class="btn" type="danger" @click="loginout">退出登录</van-button>
    <div style="height: 4rem"></div>
  </div>
</template>
<script>
import { orderCount } from '@/api/user'
export default {
  data() {
    return {
      myInfo: [],
    };
  },
  async created() {
    this.myInfo = await orderCount()
  },
  methods: {
    loginout() {
      sessionStorage.clear;
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less">
.van-cell__title,
.van-cell__value {
  text-align: left;
}

.process {
  .van-grid-item {
    .van-grid-item__icon+.van-grid-item__text {
      font-size: 0.9rem;
    }

    .van-grid-item__content {
      .van-grid-item__icon {
        color: #3e7ba4;
        font-size: 1.75rem;
        filter: drop-shadow(2px 3px 5px #9ecde6eb);
      }
    }
  }
}

.van-cell__left-icon {
  // color: #70a8c5;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  background-image: linear-gradient(to right, #00c5cd, purple);
  -webkit-background-clip: text;
  color: transparent;
}

.user-details {
  .van-grid-item {
    .van-grid-item__content {
      line-height: 1.8rem;

      .count {
        color: #3a96d2;
        font-weight: 700;
      }
    }
  }
}

.me {
  min-height: 100%;
  background-color: #f7f7fb;

  .order {
    background-color: #fff;
    height: 3rem;
    line-height: 3rem;

    .my-order {
      display: inline-block;
      text-align: left;
      width: 60%;
      font-weight: 700;
      margin-left: 0.5rem;
    }

    .order-all {
      display: inline-block;
      text-align: right;
      width: 30%;
      margin-right: 0.3rem;
      font-size: 1rem;
      color: #afafaf;
    }
  }
}

.user-name {
  padding: 1.5rem;
  padding-bottom: 1rem;
  background-color: #fff;
}

.btn {
  border-radius: 0.5rem;
  padding: 0 1.8rem;
  font-size: 0.9rem;
  height: 2.5rem;
}
</style>