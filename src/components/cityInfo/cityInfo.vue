<template>

  <view class="w-full h-screen flex flex-col items-center ">

    <!-- 城市说明 -->
    <view class="w-full h-2/5 flex flex-shrink-0 flex-col bg-cover items-center	rounded-md"
          :style="{ backgroundImage: `url(${cityInfo.cityImg})` }">
<!--      城市基本信息-->
      <view class="w-full h-2/3 flex flex-col items-center">

        <!--      城市名称及top景点-->
        <view class="w-11/12 h-1/2 flex flex-row items-center">

          <view class="flex flex-row w-auto h-1/4  flex-shrink-0	">
            <text class="text-2xl	font-sans text-white text-center	bg-[#3D4144] bg-opacity-40 rounded">{{
                cityInfo.cityName
              }}
            </text>
          </view>
          <!-- 景区列表 -->
          <view class=" w-auto h-1/4 flex flex-row  flex-wrap justify-start">
            <view class="mx-0.5 p-0.5" v-for="(sceneryName,index) in cityInfo.sceneryList" :key="index">
              <text
                  class="text-xs  text-white  bg-[#3D4144] bg-opacity-40	rounded">
                {{ sceneryName }}
              </text>
            </view>
          </view>

        </view>


        <!-- 城市描述 -->
        <view class="w-11/12 h-1/2  flex flex-row bg-gray-600 bg-opacity-40 p-1 rounded	">
          <text class="w-full h-full text-white text-xs leading-normal	tracking-wide font-mono"> {{ cityDetail.cityDesc }}</text>
        </view>

      </view>


    </view>

<!--    交通信息-->
    <view class="w-11/12 h-1/2 flex flex-col rounded-lg	items-center bg-white shadow-md -mt-75">
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
    <view class="w-11/12 h-1/4 flex flex-shrink-0 flex-col bg-cover rounded	"
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

      <view class="flex-1	 flex-col w-11/12 h-3/5 justify-start  items-end m-auto">

        <view class="flex flex-col w-full h-3/5 mt-14 ">

          <!--        级别分数-->
          <view class="flex flex-row h-1/5 w-full text-center items-center m-1">
            <view class="w-8 h-auto bg-gray-600  bg-opacity-40 rounded items-center mx-0.5"><text class="text-white  text-xs ">{{sceneryStar}}</text></view>
            <view class="w-8 h-auto bg-blue-400 rounded"><text class="text-white font-medium text-xs	  ">{{scenerySore}}</text></view>

          </view>

          <view class="w-full h-2/5 overflow-auto">
            <text class="text-white text-xs bg-gray-600 bg-opacity-40 rounded ">{{sceneryDesc}}</text>
          </view>
        </view>
        </view>
    </view>

    <u-divider></u-divider>
    <!-- 当地美食 -->
    <view  v-if="cityDetail.foodInfoList.length>0" class="w-11/12 h-auto flex flex-shrink-0 flex-col bg-cover rounded  bg-white	">
      <view class=" m-2">
        <text class="text-xl	font-sans text-[#636363]">当地美食</text>
      </view>

      <!-- 美食列表 -->
      <u-scroll-list >
        <view class="justify-between mx-2 my-1 text-center text-xs"  :class="{'justify-between mx-2 my-1 text-center text-xs text-blue-500': rSelect.indexOf(index)!=-1}"  v-for="(foodInfo, index) in cityDetail.foodInfoList" :key="index">
          <image class="rounded-full h-16 w-16 flex items-center justify-center bg-cover my-2"
                 :src="foodInfo.foodImg" @click="changeFoodInfo(foodInfo,index)"></image>
          <text>{{ foodInfo.foodName }}</text>
        </view>
      </u-scroll-list>


      <!--      美食描述-->
      <view class="w-11/12 bg-[#F6F7F9] h-auto mx-auto rounded-xl p-2 mb-3">
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
      rSelect:[],
      cityDetail: Object,
      hotSceneryBgImg: this.cityInfo.cityImg,
      sceneryStar:'OA',
      scenerySore:'0',
      sceneryDesc:'',
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
      this.sceneryStar = sceneryInfo.rate
      this.scenerySore = sceneryInfo.score
      this.sceneryDesc =sceneryInfo.sceneryDesc


    },
    changeFoodInfo(foodInfo,e) {
      this.hotFoodImg = foodInfo.foodImg ? foodInfo.foodImg : this.cityInfo.cityImg
      this.hotFoodDesc = foodInfo.foodDesc
      this.rSelect=[]
      if (this.rSelect.indexOf(e) == -1) {
        this.rSelect.push(e);//选中添加到数组里
      } else {
        this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
      }
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

          if (this.cityDetail.sceneryInfoList.length>0) {
            const sceneryInfo = this.cityDetail.sceneryInfoList[0]
            this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl ? sceneryInfo.sceneryImgUrl : this.cityInfo.cityImg
            this.sceneryStar = sceneryInfo.rate
            this.scenerySore = sceneryInfo.score
            this.sceneryDesc = sceneryInfo.sceneryDesc
            for (let sceneryInfo of this.cityDetail.sceneryInfoList) {
              this.hotSceneryList.push({'name': sceneryInfo.sceneryName})
              this.hotSceneryMap.set(sceneryInfo.sceneryName, sceneryInfo)
            }
          }

          if (this.cityDetail.foodInfoList.length>0) {
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
