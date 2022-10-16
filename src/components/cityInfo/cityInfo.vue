<template>

  <view class="w-full h-screen flex flex-col items-center ">

    <!-- 城市说明 -->
    <view class="w-full h-2/5 flex flex-shrink-0 flex-col bg-cover items-center	rounded-md"
          :style="{ backgroundImage: `url(${cityInfo.cityImg})` }">

      <view class="w-11/12 h-[10vh] flex flex-row items-baseline">
        <view class=" mt-8">
          <text class="text-2xl	font-sans text-white	bg-[#3D4144] bg-opacity-40 rounded">{{
              cityInfo.cityName
            }}
          </text>
        </view>

        <!-- 景区列表 -->
        <view class="  h-auto flex flex-row justify-start mt-2">
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
        <text> {{ cityDetail.cityDesc }}</text>
      </view>
    </view>


    <view class="w-11/12 h-3/6 flex flex-col rounded-lg	items-center bg-white shadow-md -mt-75">
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
    <u-divider></u-divider>

    <!-- 热门景点 -->
    <view class="w-11/12 h-1/3 flex flex-shrink-0 flex-col bg-cover rounded	"
          :style="{ backgroundImage: `url(${hotSceneryBgImg})` }">

      <view class=" m-2">
        <text class="text-2xl	font-sans text-white">热门景点</text>
      </view>

      <!-- 景区列表 -->
      <u-tabs :list="hotSceneryList" lineWidth="20" lineColor="transparent" lineHeight="7" :activeStyle="{
        color: '#fff',
        backgroundColor:'#3B84ED',
        borderRadius:'30px',
        transform: 'scale(1.05)',
        padding:'2px 10px',
        }"
              :inactiveStyle="{
        color: '#606266',
        backgroundColor:'#fff',
                borderRadius:'30px',
                opacity:'0.9',
        padding:'2px 10px',

        transform: 'scale(1)'
    }" itemStyle="padding-left: 15px; padding-right: 15px; height: 45px;"
              @click="changeSceneryBackImg"></u-tabs>
    </view>

    <u-divider></u-divider>
    <!-- 当地美食 -->
    <view class="w-11/12 h-2/5 flex flex-shrink-0 flex-col bg-cover rounded  bg-white	">
      <view class=" m-2">
        <text class="text-xl	font-sans text-[#636363]">当地美食</text>
      </view>

      <!-- 美食列表 -->
      <u-scroll-list >
        <view class="flex flex-row ">
          <view class="justify-between mr-5" v-for="(foodInfo, index) in cityDetail.foodInfoList" :key="index"
                @click="changeFoodInfo(foodInfo)">
            <image class="rounded-full h-14 w-14 flex items-center justify-center bg-cover"
                   :src="foodInfo.foodImg"></image>
            <text class="text-xs">{{ foodInfo.foodName.substr(0, 4) }}</text>
          </view>
        </view>
      </u-scroll-list>

      <!--      美食描述-->
      <view class="w-11/12 bg-[#F6F7F9] h-auto mx-auto rounded-xl p-2">
        <text class="text-xs">{{ hotFoodDesc }}</text>
      </view>
    </view>
    <u-divider text="已经到底了" lineColor="#303D4E"></u-divider>
  </view>
</template>

<script>
import config from "@/common/config";

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
      cityDetail: Object,
      hotSceneryBgImg: this.cityInfo.cityImg,
      showScrollbar: true,
      pagingEnabled: false,
      hotSceneryList: [],
      hotSceneryMap: new Map(),
      hotFoodImg: this.cityInfo.cityImg,
      hotFoodDesc: '',
      hotFoodList: [],
      hotFoodMap: new Map(),
    }


  },
  created() {
    this.queryCityInfo()
  },


  methods: {

    // 调用父组件方法关闭组件
    close() {
      this.$emit("closeSpatialQuery3D_", false);
    },

    scrolltolower() {
      this.loadmore()
    },
    loadmore() {
      console.log("loadmore了")
    },

    changeSceneryBackImg(index) {

      const sceneryInfo = this.hotSceneryMap.get(index.name)
      this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl ? sceneryInfo.sceneryImgUrl : this.cityInfo.cityImg
    },
    changeFoodInfo(foodInfo) {

      this.hotFoodImg = foodInfo.foodImg ? foodInfo.foodImg : this.cityInfo.cityImg
      this.hotFoodDesc = foodInfo.foodDesc
    },

    queryCityInfo() {
      let that = this;
      console.log("this.cityInfo", this.cityInfo)
      let params = {
        "cityName": this.cityInfo.cityName,
      }
      that.isLoading = true;
      that.loadStatus = 'loading';

      this.$http.httpGet(config.queryCityInfo,
          params
      ).then(res => {

        this.isLoading = false;
        uni.hideLoading()
        uni.stopPullDownRefresh()
        if (res.success == true) {
          this.cityDetail = res.data

          if (this.cityDetail.sceneryInfoList) {
            const sceneryInfo = this.cityDetail.sceneryInfoList[0]
            this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl ? sceneryInfo.sceneryImgUrl : this.cityInfo.cityImg
            for (let sceneryInfo of this.cityDetail.sceneryInfoList) {
              this.hotSceneryList.push({'name': sceneryInfo.sceneryName})
              this.hotSceneryMap.set(sceneryInfo.sceneryName, sceneryInfo)
            }
          }

          if (this.cityDetail.foodInfoList) {
            const foodInfo = this.cityDetail.foodInfoList[0]
            this.hotFoodDesc = foodInfo.foodDesc ? foodInfo.foodDesc : this.cityInfo.cityImg
            for (let foodInfo of this.cityDetail.foodInfoList) {
              this.hotFoodList.push({'name': foodInfo.foodName})
              this.hotFoodMap.set(foodInfo.foodName, foodInfo)
            }
          }
        } else {
          console.log("请求异常")
        }
      });
    },

  }
}
</script>

<style lang="scss">
.scroll-list {
  @include flex(column);

  &__goods-item {
    margin-right: 20px;

    &__image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }

    &__text {
      color: #f56c6c;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }

  &__show-more {
    background-color: #fff0f0;
    border-radius: 3px;
    padding: 3px 6px;
    @include flex(column);
    align-items: center;

    &__text {
      font-size: 12px;
      width: 12px;
      color: #f56c6c;
      line-height: 16px;
    }
  }
}

.scroll-Y {
  height: 300rpx;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}

.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>
