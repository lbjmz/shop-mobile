<template>
  <div>
    <!-- 搜索 -->
    <van-search
      placeholder="搜索"
      shape="round"
      input-align="center"
      icon-align="center"
    />
    <!-- 轮播 -->
    <van-swipe
      class="my-swipe"
      indicator-color="#3e98d1"
      style="height: 12rem"
      :autoplay="3000"
    >
      <van-swipe-item v-for="img in images" :key="img.imgUrl">
        <van-image :src="img.imgUrl" fit="fill" />
      </van-swipe-item>
    </van-swipe>
    <div style="width: 100%; height: 0.5rem"></div>

    <!-- 导航 -->
    <van-grid :border="false">
      <van-grid-item icon="new-arrival-o" text="新品推荐" />
      <van-grid-item icon="shop-collect-o" text="限时特惠" />
      <van-grid-item icon="hot-sale-o" text="每日疯抢" />
      <van-grid-item icon="discount" text="领优惠券" />
    </van-grid>

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="comment"
      :scrollable="false"
      background="white"
      color="#363636"
      mode="link"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          style="text-align: left; padding-left: 0.5rem"
          v-for="item in noticeList.records"
          :key="item.id"
        >
          {{ item.title }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <!-- 商品列表 -->
    <div class="pro-list">
      <div style="height: 10.5rem; background-color: #3f99d3; flex-shrink: 0">
        <div style="width: 100%; height: 1rem"></div>
        <div v-for="tag in tagProdList" :key="tag.id">
          <div class="list-tittle">
            <span class="new">{{ tag.title }}</span>
            <span class="more">
              <van-button class="btn-more" color="#63b0df" size="small"
                >查看更多</van-button
              >
            </span>
          </div>
          <van-grid :border="false" :column-num="3">
            <van-grid-item
              v-for="goods in tag.productDtoList"
              :key="goods.id"
              @click="gotoClick(goods)"
            >
              <van-image :src="goods.pic" fit="fill" />
              <div class="pro-info">{{ goods.prodName }}</div>
              <div class="pro-price">￥{{ goods.price }}</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import { indexImgs } from "@/api/home";
import { tagProdList } from "@/api/home";
import { noticeList } from "@/api/home";
export default {
  data() {
    return {
      // value: "",
      images: [],
      noticeList: [],
      tagProdList: [],
    };
  },
  //发起一个请求
  async created() {
    this.images = await indexImgs();
    this.noticeList = await noticeList();
    this.tagProdList = await tagProdList();
  },
  methods: {
    gotoClick(goods) {
      this.$router.push({
        path: "/prodInfo",
        query: {
          prodId: goods.prodId,
        },
      });
    },
  },
  components: {
    Swipe,
    SwipeItem,
  },
};
</script>
<style lang="less">
.my-swipe .van-swipe-item {
  .van-image {
    height: 100%;
    width: 95%;
  }
}

.notice-swipe {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
}
.van-image__error,
.van-image__img,
.van-image__loading {
  border-radius: 0.5rem;
}
.pro-list {
  height: 90rem;
  .van-grid {
    .van-grid-item {
      .van-grid-item__content {
        background: none;
        .pro-price {
          color: red;
          text-align: left;
          width: 100%;
          margin-left: 1rem;
        }
        .pro-info {
          font-size: 0.5rem;
          padding: 0.1rem;
          font-weight: 500;
          display: -webkit-box;
          overflow: hidden;
          // 溢出:隐藏。
          // 文本溢出:省略号;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  flex-shrink: 0;
  .list-tittle {
    display: flex;
    height: 2rem;

    .new {
      line-height: 2rem;
      text-align: left;
      width: 50%;
      padding-left: 1rem;
      // color: #fff;
    }
    .more {
      text-align: right;
      width: 40%;
      // padding-right: 1rem;
    }
  }
}
.btn-more {
  border-radius: 1rem;
  height: 1.6rem;
  padding: 0 1.2rem;
}
.van-notice-bar__left-icon {
  color: red;
  font-size: 1rem;
}
.van-notice-bar__right-icon {
  color: #363636;
}
</style>
