<template>

</template>

<script>

import amap from '@/common/amap-wx.130';
export default {
  name: "cityLocation",

  data() {
    return {
      amapPlugin: null,
      gaodekey: 'df7259c59601031d6dee0a6656bd26a2', //高德key,此处的key需要去高德平台申请获取，此key是假的！！！
      address: "", // 已经获取到的位置
    }
  },
  created() {
    this.amapPlugin = new amap.AMapWX({
      key: this.gaodekey
    });
    this.getLocation();
  },

  methods:{
    getLocation() {
      const _this = this;
      this.amapPlugin = new amap.AMapWX({
        key: this.gaodekey
      });
      uni.showLoading({
        title: '获取信息中'
      });
      // 成功获取位置
      _this.amapPlugin.getRegeo({
        success: (data) => {

          let city = data[0].regeocodeData.addressComponent.province
          let province = data[0].regeocodeData.addressComponent.province
          let district = data[0].regeocodeData.addressComponent.district
          if(city == null){
            _this.departCity = province
          }
          else if(district !=null && (district.endsWith('市') || district.endsWith('县') || district.endsWith('州') || district.endsWith('盟') || district.endsWith('旗'))){
            _this.departCity = district
          }else{
            _this.departCity = city

          }
          console.log(this.departCity, 'citLocaltion当前定位');

          // 传出
          _this.$emit("loadAddress",_this.departCity)
          uni.hideLoading();
        },
        // 获取位置失败
        fail: (err) => {
          console.log("获取失败，查看原因",err)
          uni.showToast({
            title: "获取位置失败，请重启小程序",
            icon: "error"
          })
        }
      });
    },
  }


}


</script>

<style scoped>

</style>