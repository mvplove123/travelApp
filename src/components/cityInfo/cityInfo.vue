<template>


  <view class="w-screen h-full flex flex-col items-center">

    <!-- 城市说明 -->
    <view class="w-full h-3/6 flex flex-shrink-0 flex-col bg-cover items-center	"
          :style="{ backgroundImage: `url(${cityInfo.cityImg})` }">

      <view class="w-11/12 h-[10vh] flex flex-row items-baseline">

        <view class=" mt-8">
          <text class="text-2xl	font-sans text-white	bg-[#3D4144] bg-opacity-40 rounded" >{{ cityInfo.cityName }}</text>
        </view>

        <!-- 景区列表 -->
        <view class=" w-3/5 h-auto flex flex-row justify-start mt-2">
          <view class="" v-for="(sceneryName,index) in cityInfo.sceneryList" :key="index">
            <text
                class="text-xs  text-white ml-0.5 pl-0.5 pr-0.5 bg-[#3D4144] bg-opacity-40	">
              {{ sceneryName }}
            </text>
          </view>
        </view>

      </view>


      <!-- 城市描述 -->
      <view class="w-11/12 h-[5vh]  flex flex-row text-white text-xs  bg-gray-600 bg-opacity-40	">

        <text> {{ cityInfo.cityDesc }}</text>


      </view>

    </view>


    <view class="w-11/12 h-auto flex flex-col rounded-lg	items-center bg-white shadow-md -mt-75">
      <view class="flex flex-row w-11/12 h-auto">
        <text class="font-medium mt-2 mb-1">交通信息</text>
      </view>

      <u-list @scrolltolower="scrolltolower" width="100% " height="500rpx" preLoadScreen="100">
        <u-list-item v-for="(item, index) in cityInfo.trafficScheduleInfoList" :key="index">

          <view class="w-full h-auto flex justify-center items-center">

            <!-- 火车票信息 -->
            <view class="flex flex-row  w-11/12 h-auto mt-1 mb-1  justify-around bg-[#F6F7F9]  rounded ">

              <view class="flex justify-center items-center">
                <text>{{ index + 1 }}</text>
              </view>

              <view class="flex flex-col justify-around		">
                <text class="text-lg font-medium	text-[#60A5FA]	">{{ item.departureTime }}</text>
                <text class="text-xs">{{ item.departureStationName }}</text>
              </view>

              <view class="flex flex-col content-start items-center ">
                <text class="text-xs mt-1 text-center	">{{ item.runningTime }}</text>
                <image class="w-16 h-3 -mt-0.5 -mb-0.5" src="/static/img/banner/youjiandou.png"/>
                <text class="text-xs mb-1 text-center	">{{ item.trainNoAlias }}</text>

              </view>

              <view class="flex flex-col justify-around ">
                <text class="text-lg font-medium">{{ item.arriveTime }}</text>
                <text class="text-xs ">{{ item.arriveStationName }}</text>
              </view>
            </view>

          </view>

        </u-list-item>
      </u-list>

    </view>


    <!-- 车次列表 -->


    <u-divider text="热门景点"></u-divider>
    <text>热门</text>

    <!-- 热门景点 -->


    <u-swiper :list="cityInfo.sceneryList" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
              bgColor="#ffffff"></u-swiper>

    <view class="w-full h-auto"></view>
    <u-divider text="当地美食"></u-divider>

    <!-- 当地美食 -->
    <view class=""></view>


  </view>

</template>

<script>
export default {


  name: "cityInfo",

  props: {
    cityInfo: {
      type: Object,
      default: () => {
      }
    },
    value: {}
  },

  data() {
    return {
      showScrollbar: true,
      pagingEnabled: false
    }


  },
  onLoad() {
    this.loadmore()
  },
  methods: {
    scrolltolower() {
      this.loadmore()
    },
    loadmore() {
      console.log("loadmore了")
      // for (let i = 0; i < 30; i++) {
      // 	this.indexList.push({
      // 		url: this.urls[uni.$u.random(0, this.urls.length - 1)]
      // 	})
      // }
    }
  }
}
</script>

<style lang="scss">

</style>
