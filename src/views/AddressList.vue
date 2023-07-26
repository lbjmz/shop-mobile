<template>
    <div>
        <van-nav-bar title="地址列表" v-if="type === 'list'" left-text="返回" left-arrow @click-left="$router.go(-1)" />
        <van-address-list v-if="type === 'list'" v-model="chosenAddressId" :list="list" :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="selectAddr" />

        <van-nav-bar title="添加地址" v-if="type === 'edit'" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-address-edit v-show="type === 'edit'" :area-list="areaList" show-delete show-set-default
            :address-info="addressInfo" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
            @change-detail="onChangeDetail" @change-default="onChangeDefault" />

    </div>
</template>
<script>
import { addressList, addAddr, listByPid, updateAddr, deleteAddr, defaultAddr } from '@/api/address'
import { areaList } from '@vant/area-data'
export default {
    data() {
        return {
            chosenAddressId: 0,
            list: [],
            type: 'list',
            areaList: areaList,
            disabledList: [],
            searchResult: [],
            addressInfo: {},
        };
    },
    // () => {
    //         const addrback = sessionStorage.getItem('addrback')
    //         if (addrback) {
    //             $router.push(addrback)
    //         } else { $router.push('/me') }
    //     }
    async created() {

        // sessionStorage.setItem("addrback",'/me')
        this.init()
    },
    beforeRouteEnter(to, from, next) {
        const path=from.path=== '/' ? 'home':'/path'
        sessionStorage.setItem("addrback", from.path)
        next()
    },
    methods: {
        goBack() {
            const addrback = sessionStorage.getItem('addrback');

            if (addrback) {
                // 存在上一级地址，返回到上一级
                this.$router.push(addrback);
            } else {
                // 不存在上一级地址，则跳转到 '/me'
                this.$router.push('/me');
            }
            return sessionStorage.getItem('addrback');
        },

        async init() {
            const list = await addressList()
            //格式化
            list.map(result => {
                result.tel = result.mobile
                result.address = result.province + '' + result.city + '' + result.area + '' + result.addr
                result.name = result.receiver
                result.id = result.areaId
                result.isDefault = result.commonAddr === 1 ? true : false
            })
            this.list = list
            // console.log(this.list.isDefault)
        },
        selectAddr(item, index) {
            console.log(item, index)
            defaultAddr(item.addrId).then(r => {
                this.init()
            })
        },
        onClickLeft() {
            this.init()
            this.type = 'list'
        },
        onDelete(data) {
            deleteAddr(data.id).then(() => {
                this.onClickLeft()
            })
        },
        onChangeDetail(val) {
        },
        onAdd() {
            this.type = 'edit'
            // Toast('新增地址');
        },
        onChangeDefault() {

        },
        onEdit(data) {
            this.addressInfo = {
                id: data.addrId,
                tel: data.mobile,
                province: data.province,
                name: data.receiver,
                city: data.city,
                addressDetail: data.addr,
                county: data.area,
                areaCode: '',
                // postalCode: data.postalCode,
                isDefault: data.commonAddr === 1 ? true : false

            }
            this.onAdd()
        },
        onChangeDefault(value) {
            // 将用户选择的默认地址选项更新到 addressInfo 对象中
            this.addressInfo.isDefault = value;
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
                                    const postdata = {
                                        receiver: data.name,
                                        addr: data.addressDetail,
                                        // postCode: data.postalCode,
                                        mobile: data.tel,
                                        province: data.province,
                                        provinceId: data.provinceId,
                                        city: data.city,
                                        cityId: data.cityId,
                                        area: data.county,
                                        areaId: data.countyId,
                                        commonAddr: this.addressInfo.isDefault ? 0 : 1 // 使用 addressInfo.isDefault 的值
                                    }
                                    if (data.id) {
                                        postdata.addrId = data.id
                                        updateAddr(postdata).then(() => {
                                            this.onClickLeft()
                                        })
                                    } else {
                                        addAddr(postdata).then(() => {
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


            // addAddr({
            //     receiver: data.name,
            //     addr: data.addressDetail,
            //     postCode: data.postalCode,
            //     mobile: data.tel,
            //     provinceId: data.provinceId,
            //     cityId: data.cityId,
            //     areaId: data.areaId,
            //     province: data.province,
            //     city: data.city,
            //     area: data.county,
            // })

            // Toast('编辑地址:' + index);
        },
    },
};
</script>