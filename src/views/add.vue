<template>
    <div>
        <van-nav-bar v-if="type === 'list'" title="添加列表" left-text="返回" left-arrow @click-left="$router.push('/me')" />
        <van-address-list v-if="type === 'list'" v-model="chosenAddressId" :list="list" :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit" />

        <van-nav-bar v-if="type === 'edit'" title="添加地址" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-address-edit v-show="type === 'edit'" show-delete :address-info="addressInfo" :area-list="areaList"
            show-set-default @delete="onDelete" :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"></van-address-edit>
    </div>
</template>
<script>
import { addresslist, addAddr, listByPid, updateAddr, deleteAddr } from '@/api/address'
import { areaList } from '@vant/area-data'
export default {
    data() {
        return {
            chosenAddressId: 0,
            list: [],
            type: 'list',
            disabledList: [],
            areaList: areaList,
            searchResult: [],
            addressInfo: {}
        }
    },

    async created() {
        this.init()
    },
    methods: {
        async init() {
            const list = await addresslist()
            //格式化
            list.map(result => {
                result.tel = result.mobile
                result.address = result.province + '' + result.city + '' + result.area + '' + result.addr
                result.name = result.receiver
                result.id = result.areaId
                result.isDefault = result.commonAddr === 1 ? true : false
            })
            this.list = list
        },
        onClickLeft() {
            this.init()
            this.type = 'list'
        },
        onDelete(data){
            deleteAddr(data.id).then(()=>{
                this.onClickLeft()
            })
        },
     
        onAdd() {
            this.type = 'edit'
            // Toast('新增地址');
        },

        onEdit(data) {
            this.addressInfo = {
                id: data.areaId,
                tel: data.mobile,
                province: data.province,
                name: data.receiver,
                city: data.city,
                addressDetail: data.addr,
                areaCode: '',
                // postalCode: data.postalCode,
                isDefault: data.commonAddr === 1 ? true : false

            }
            this.onAdd()
        },

        async onSave(data) {
            const province = await listByPid({ pid: 0 })
            province.map(async (result) => {
                if (data.province === result.areaName) {
                    data.provinceId = result.areaId
                    const city = await listByPid({ pid: result.areaId })
                    city.map(async (result) => {
                        if (data.city === result.areaName) {
                            data.cityId = result.areaId
                            const city = await listByPid({ pid: result.areaId })
                            city.map(async (result) => {
                                if (data.county === result.areaName) {
                                    data.countyId = result.areaId
                                    const postData = {
                                        receiver: data.name,
                                        addr: data.addressDetail,
                                        mobile: data.tel,
                                        province: data.province,
                                        provinceId: data.provinceId,
                                        city: data.city,
                                        cityId: data.cityId,
                                        area: data.county,
                                        areaId: data.countyId,
                                        commonAddr: data.isDefault ? 1 : 0
                                    }
                                    if (data.id) {
                                        postData.addrId = data.id
                                        updateAddr(postData).then(()=>{
                                            this.onClickLeft()
                                        })
                                    } else {
                                        addAddr(postData).then(()=>{
                                            this.onClickLeft()
                                        })
                                    }
                                    this.addressInfo = {}
                                }
                            })
                        }
                    })
                }
            })
        }
    },
};
</script>