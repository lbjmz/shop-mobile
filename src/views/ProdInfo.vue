<template>
  <div class="prod-info">
    <div><van-nav-bar :title="prodData.prodName" left-text="返回" left-arrow @click-left="$router.go(-1)" /></div>

    <!-- <h1>商品详情</h1> -->
    <van-swipe class="my-swipe" indicator-color="#e1234f" :autoplay="3000">
      <van-swipe-item v-for="img in prodData.imgs" :key="img">
        <van-image style="margin-top: 0.5rem" v-if="prodData.imgs" :src="img" fit="fill" />
      </van-swipe-item>
    </van-swipe>

    <van-divider />

    <!-- 商品介绍 -->
    <div class="prod-title">
      <van-row style="background: #fff">
        <van-col span="16" style="text-align: left; padding-left: 1rem; ">
          {{ prodData.prodName }}
        </van-col>

        <!-- <van-col span="4"></van-col> -->
        <van-col span="6" style="padding-left: 1rem">
          <!-- <van-icon v-show="type==='f'"   @click="collection"  name="like-o" size="25" />
          <van-icon v-if="isCollection" v-show="type==='t'" style="color: red"  name="like" size="20" /> -->
          <div>
            <div class="custom-divider" @click="addOrCancel">
              <span style="cursor:pointer;font-size:1rem">
                <van-icon v-if="!isCollection" name="like-o" />
                <van-icon v-if="isCollection" name="like" color="#FF0000" />
                <div>收藏</div>
              </span>
            </div>
          </div>

        </van-col>
        <van-col span="20" style="font-size: 0.6rem;color: #696969;text-align: left;padding-left: 1rem;">
          {{ prodData.brief }}
        </van-col>
      </van-row>
      <div class="prod-title-name">
        ￥ <span class="prod-price">{{ prodData.price }}</span>
      </div>
    </div>

    <!-- 分割线 -->
    <van-divider :style="{ borderColor: '#f7f7fb', border: '.5rem solid #f7f7fb' }">
    </van-divider>

    <!-- 类别 -->
    <div class="prod-sku" v-if="skuList.length > 0" @click="openSkuPlan">
      <span style="font-size: 0.9rem; color: #696969">已选 <span class="prod-sku-title">{{ defaultSku.skuName }} {{
        confirm.orderItem.prodCount }}件</span>
      </span>
      <span class="right">...</span>
    </div>

    <!-- 分割线 -->
    <van-divider :style="{ borderColor: '#f7f7fb', border: '.5rem solid #f7f7fb' }" />

    <!-- 评价 -->
    <van-cell value="共0条" is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">评价</span>
        <span style="color: #fc0000; font-size: 0.5rem">好评{{ commData.positiveRating }}%</span>
      </template>
    </van-cell>

    <!-- 分割线
    <van-divider :style="{ borderColor: '#f7f7fb', border: ' solid #f7f7fb' }">
    </van-divider> -->

    <van-grid :column-num="5" :border="false">
      <van-grid-item>
        <van-tag type="warning">全部({{ commData.number }})</van-tag>
      </van-grid-item>
      <van-grid-item>
        <van-tag type="warning">好评({{ commData.praiseNumber }})</van-tag>
      </van-grid-item>
      <van-grid-item>
        <van-tag type="warning">中评({{ commData.secondaryNumber }})</van-tag>
      </van-grid-item>
      <van-grid-item>
        <van-tag type="warning">差评({{ commData.negativeNumber }})</van-tag>
      </van-grid-item>
      <van-grid-item>
        <van-tag type="warning">有图({{ commData.picNumber }})</van-tag>
      </van-grid-item>
    </van-grid>

    <div class="content" v-if="prodData.content" v-html="formatHtml(prodData.content)"></div>

    <!-- 购物框 -->
    <van-action-sheet v-model="showDec" title="选择类别">
      <van-card :num="confirm.orderItem.prodCount"
        :price="defaultSku.price ? defaultSku.price + '.00' : prodData.price + '.00'" :desc="prodData.brief"
        :title="defaultSku.skuName ? defaultSku.skuName : prodData.skuName"
        :thumb="defaultSku.pic ? defaultSku.pic : prodData.pic" style="text-align:left;">
        <template #footer>
          <div class="step-acount">
            <div class="acount">数量</div>
            <!-- :value  v-model -->
            <van-stepper v-model="confirm.orderItem.prodCount" style="line-height: 1.5rem;" integer />
          </div>
        </template>
      </van-card>
      <div class="action-sheet-content">
        <div>
          <div v-for="(tag, inx) in tags" :key="inx">
            <div style="text-align: left;color:#696969;font-size:.8rem;margin-left:1rem;">{{ inx }}</div>
            <div class="prod-tag">
              <van-tag @click="selectTag(inx, tg)" plain
                :class="{ 'prop-selected': selectedTag[inx] === tg ? true : false }" v-for="(tg, index) in tag"
                :key="index" type="danger">
                {{ tg }}
              </van-tag>
            </div>
          </div>

          <div style="text-align: left;padding-left:1rem">
            <span style="font-size: 0.9rem; color: #696969;text-align: left;">已选</span>
            <span class="prod-defau-sku-title"> {{ defaultSku.skuName }} {{
              confirm.orderItem.prodCount }}件</span>

          </div>

        </div>
        <div class="pro-btn">
          <van-button class="shop-btn" square :disabled="defaultSku.price ? false : true" color="#564d60"
            @click="shopCartpro">加入购物车</van-button>
          <van-button class="buy-btn" square :disabled="defaultSku.price ? false : true" color="#eb2446"
            @click="buynow">立即购买</van-button>
        </div>
      </div>
    </van-action-sheet>

    <van-action-sheet v-model="show" title="选择类别">
      <div class="action-sheet-content">
        <div>
          <div v-for="(tag, inx) in tags" :key="inx">
            <div style="text-align: left;color:#696969;font-size:.8rem;margin-left:1rem;">{{ inx }}</div>
            <div class="prod-tag">
              <van-tag @click="selectTag(inx, tg)" plain
                :class="{ 'prop-selected': selectedTag[inx] === tg ? true : false }" v-for="(tg, index) in tag"
                :key="index" type="danger">
                {{ tg }}
              </van-tag>
            </div>

          </div>
        </div>
        <van-button :disabled="defaultSku.skuName ? false : true" type="danger" block @click="handclick">确定</van-button>
      </div>
    </van-action-sheet>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/shopCart')" :badge="count" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="1" />
      <van-goods-action-button type="warning" text="加入购物车" @click="showDec = true" />
      <van-goods-action-button type="danger" text="立即购买" @click="showDec = true" />
    </van-goods-action>

    <div style="height: 5rem"></div>
  </div>
</template>
<script>
import emitter from '@/utils/mitt';
import { prodCount } from "@/api/shopcart";
import { Toast } from 'vant';
import { prodInfo, prodCommData, isCollection, changeItem, confirm, submit, addOrCancel } from "@/api/prodinfo";
import { formatHtml } from "@/utils/utils";
export default {
  created() {
    // 监听订阅事件 
    emitter.on('changeItem', this.fetchCartCount);
  },
  mounted() {
    this.fetchCartCount();
  },
  data() {
    return {
      // type: 'f',
      prodId: 0,
      showDec: false,
      prodData: {},
      skuList: [],
      selectedTag: {},
      transport: {},
      skuSelected: null,
      defaultSku: {},
      count: 0,
      // imgs: [],
      commData: {
        positiveRating: 0,
        number: 0,
        praiseNumber: 0,
        secondaryNumber: 0,
        negativeNumber: 0,
        picNumber: 0,
      },
      isCollection: false,
      show: false,
      tags: {},
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
      shopcart: {
        basketId: 0,
        prodId: 0,
        skuId: 0,
        shopId: 0,
        count: 0,
        distributionCardNo: "",
      },
    };
  },

  async created() {
    // this.prodId = ;
    this.load()
  },
  methods: {
    async load() {
      const prod = await prodInfo({ prodId: this.$route.query.prodId });
      this.skuList = prod.skuList;
      this.transport = prod.transport;
      this.prodData = prod;
      prod.imgs = prod.imgs.split(",");
      this.commData = await prodCommData({ prodId: prod.prodId });
      this.isCollection = await isCollection({ prodId: prod.prodId });
      // console.log(prod);
      this.init(this.skuList)
    },
    async fetchCartCount() {
      this.count = await prodCount();
    },
    async addOrCancel() {
      await addOrCancel(this.prodData.prodId)
      this.isCollection = await isCollection({ prodId: this.prodData.prodId });
    },
    collection() {
      this.isCollection = !this.isCollection
      // console.log(this.isCollection)
    },
    buynow() {
      this.confirm.orderItem.prodId = this.prodData.prodId;
      this.confirm.orderItem.distributionCardNo = '';
      this.confirm.orderItem.skuId = this.defaultSku.skuId;
      this.confirm.orderItem.shopId = this.prodData.shopId;
      // console.log(confirm)
      sessionStorage.setItem("confirm", JSON.stringify(this.confirm))
      this.$router.push("/submit-order")

      confirm(this.confirm).then((r) => {
        submit({
          orderShopParam: [
            {
              shopId: this.prodData.shopId,
              remarks: ''
            }
          ]
        },
          // console.log(this.prodData.shopId)
        )
      }).catch((e) => {
        console.log(e)
      })

      // callback 回调 放在第三个参数位置
    },
    shopCartpro() {
      this.shopcart.basketId = 0;
      this.shopcart.prodId = this.prodData.prodId;
      this.shopcart.count = this.confirm.orderItem.prodCount;
      this.shopcart.skuId = this.defaultSku.skuId;
      this.shopcart.shopId = this.prodData.shopId;
      changeItem(this.shopcart).then(e => {
        // console.log(this.shopcart)
        Toast({
          message: '添加购物车成功',
          icon: 'cart-o',
        });
        this.count += this.shopcart.count
        this.showDec = false

      });
    },
    onClickButton() {
    },
    handclick() {
      this.show = !this.show
    },
    selectTag(propTitle, Propvalue) {
      //当用户选择一个属性的时候, 存储他的选择
      this.$set(this.selectedTag, propTitle, Propvalue)
      //判断用户选择的属性时候能找到对应的prop
      let str = ""
      for (let item in this.selectedTag) {
        // console.log(item)
        str = item + ":" + this.selectedTag[item] + ";" + str
        // console.log(str)
      }
      str = str.substring(0, str.length - 1)
      for (let i = 0; i < this.skuList.length; i++) {
        if (this.skuList[i].properties === str) {
          this.defaultSku = this.skuList[i]
          console.log(this.skuList[i].skuId)
          return;
        }
      }
      // 没货 找不到标签 给它附空
      return this.defaultSku = {}

    },
    init(sku) {
      /// "版本:换修无忧版;颜色:深空灰色;内存:64GB"
      const propObjectArr = []
      const propObject = {};
      let tags = {};
      let defaultprop = [];
      for (let i = 0; i < sku.length; i++) {
        propObjectArr.push(sku[i].properties)
      }
      for (let i = 0; i < propObjectArr.length; i++) {
        const element = propObjectArr[i].split(";");
        if (defaultprop.length === 0) {
          defaultprop = element
          this.defaultSku = sku[i]
          if (sku.length === 1) return;

        }
        for (let j = 0; j < element.length; j++) {
          const temp = element[j].split(":");
          if (!propObject[temp[0]]) {
            propObject[temp[0]] = new Set()
          }
          propObject[temp[0]].add(temp[1])
        }
      }
      console.log(propObject)
      this.tags = propObject

      for (let k = defaultprop.length - 1; k >= 0; k--) {
        const propArr = defaultprop[k].split(":")
        this.$set(this.selectedTag, propArr[0], propArr[1])
      }
    },
    openSkuPlan() {
      this.show = !this.show
    },
    formatHtml(t) {
      return formatHtml(t);
    },
  },
};
</script >

<style lang="less" scoped >
.my-swipe .van-swipe-item {
  .van-image {
    height: 95%;
    width: 95%;
  }
}

.van-nav-bar__title {
  font-weight: 700;
  font-size: 1.5rem;
}

.prod-sku .prod-sku-title[data-v-76e89f42] {
  padding-left: .5rem;
}

.prod-defau-sku-title {
  font-weight: 700;
  padding-left: .5rem;
  font-size: 1rem;

}

.van-icon {
  font-size: 1.5rem;
}

.custom-divider {
  border-left: 1px solid #8d8f92;
  padding-left: 2rem;
}

/deep/ .van-nav-bar__text {
  color: #ee0a24;
  font-weight: 600;
}

/deep/ .van-icon-arrow-left {
  color: #ee0a24;
  font-weight: 600;
}

.van-card__content {
  margin-left: 0.5rem;
}

.van-card__price-currency {
  font-size: 1rem;
}

.van-card__price-integer {
  font-size: 1.4rem;
}

.van-card__price-decimal {
  font-size: 1.4rem;
}

.van-card__price {
  font-size: 1.4rem;
}

.prod-info[data-v-76e89f42] .van-card__desc {
  font-size: .9rem;
}

.van-multi-ellipsis--l2 {
  font-size: 1rem;
  font-weight: 800;
}

.pro-btn {
  padding-top: 3rem;
}

.shop-btn {
  width: 50%;
}

.buy-btn {
  width: 50%;
}

.prop-selected {
  color: #fff !important;
  background-color: #eb2446 !important;

}

.prod-info /deep/ .van-card__desc {
  font-size: 1rem;
}

.step-acount {
  height: 2rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}

.acount {
  font-size: 1rem;
}

.van-stepper {
  padding-left: 4rem;
  display: inline-block;
}

.van-card__price {
  text-align: left;
  color: #fc0000;
}

.prod-tag {
  margin: .5rem .5rem .5rem 0rem;
  text-align: left;
}

.prod-info /deep/ .van-tag {
  // color: #ee0a24;
  margin-left: 1rem;
  padding: 0.3rem;
}

.prod-info /deep/ .action-sheet-content {
  padding-top: 1rem;
}

.prod-info /deep/ .van-card {
  background-color: #FFF;
}

.right {
  line-height: 1rem;
  padding-right: 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #696969;
}

.prod-info /deep/ .van-cell__value {
  text-align: right;
}

.prod-info /deep/ action-sheet-content {
  padding: 1rem;
}

.prod-title {
  .prod-title-name {
    color: #fc0000;
    text-align: left;
    margin: 1rem;

    .prod-price {
      color: #fc0000;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}

.prod-sku {
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  height: 1rem;

  .prod-sku-title {
    font-weight: 700;
    padding-left: 1rem;
    font-size: 1rem;
  }
}
</style>