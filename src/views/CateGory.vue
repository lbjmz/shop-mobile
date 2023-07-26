<template>
  <div class="category">
    <van-search placeholder="请搜索关键词" shape="round" />
    <van-tree-select @click-nav="categoryClick" :items="categoryInfo" height="100%" :main-active-index.sync="active">
      <!-- 插槽 -->
      <template #content>
        <van-image v-if="categoryInfo[active]" :src="categoryInfo[active].pic" />
        <van-card @click="() => { $router.push({ path: '/prodInfo', query: { prodId: item.prodId }}) }"
          v-for="item in proList.records" :num="item.prodId" :price="item.price" :desc="item.brief"
          :title="item.prodName" :thumb="item.pic" :key="item.id" />
        <!--!! 空 <=0 -->
        <van-empty v-if="proList.records <= 0" description="当前页面没有商品" />
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { categoryInfo } from "@/api/category";
import { getCategoryById } from "@/api/category";
export default {
  data() {
    return {
      active: 0,
      categoryInfo: [],
      proList: [],
    };
  },
  async created() {
    const result = await categoryInfo({ parentId: 0 });
    result.map((item) => {
      item.text = item.categoryName;
    });
    this.categoryInfo = result;
    this.categoryClick(0)
  },
  methods: {
    async categoryClick(index) {
      this.proList = await getCategoryById({
        categoryId: this.categoryInfo[index].categoryId,
      });
    },
  },

};
</script>

<style lang="less">
.category {
  height: 100%;
  overflow: hidden;
  // 开启滚动条
  // overflow-x: scroll;
  // white-space: nowrap;
}
</style>