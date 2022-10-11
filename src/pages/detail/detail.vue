<template>
  <view class="bg-[#F6F7F9]  w-full h-full flex flex-col items-center " @touchmove.stop.prevent="moveHandle">

    <!-- 导航栏 -->


    <!-- 2.0.19支持autoBack，默认为false -->
    <view class="h-10">
      <u-navbar title="排行榜" @rightClick="rightClick" :autoBack="true" bgColor="#fff"></u-navbar>

    </view>


    <!-- 图片栏 -->
    <view class="flex flex-col w-full flex-shrink-0	h-40 "
          style=" background-image: url(http://file.shopro.top/imgs/group/group_list_bg.png)">
    </view>


    <!-- <view class="w-full h-32 flex-col">

      <view class=" w-4/12 h-64 bg-red-100">text1</view>
      <view class="w-8/12 h-32 bg-yellow-300">text2</view>

    </view> -->


    <view class="h-full w-11/12 rounded-xl  flex flex-col justify-between items-center bg-[#fff] -mt-6 pb-4 pt-5">

      <u-list @scrolltolower="scrolltolower" preLoadScreen="100" height="1200rpx">

        <!-- 单个城市 -->
        <u-list-item v-for="(item,index) in cityList" :key="index">
          <view class="w-full h-32  bg-[#fff] flex flex-row rounded-xl mb-5 mt-5">
            <!-- 图片 -->
            <view class="w-4/12	 h-full rounded-xl flex justify-center items-center bg-[#fff]">
              <image class="w-4/5 h-full rounded-xl" :src="item.cityImg"/>
            </view>

            <!-- 描述 -->
            <view class="w-8/12 h-full flex flex-col [#fff] rounded-xl" @click="queryCityInfo(item)">

              <!-- 城市天气 -->
              <view>
                <view class="flex justify-between  items-center mr-3">

                  <text class="text-lg font-sans">{{ item.cityName }}</text>
                  <u-rate class="-ml-1" v-model="item.rate" allowHalf readonly size="10" gutter="2">
                  </u-rate>
                  <image class="w-4 h-4 " src="../../static/img/weather/qingtian.png"></image>
                </view>
              </view>

              <!-- 景点，城市描述 -->

              <view class="flex flex-row justify-start">
                <view class="" v-for="(sceneryName,index) in item.sceneryList" :key="index">
                  <text
                      class="text-xs border-solid border-[#D1FAE5] text-[#6EE7B7] ml-0.5 pl-0.5 pr-0.5">
                    {{ sceneryName }}
                  </text>
                </view>
              </view>

              <!-- 行程票价 -->
              <view class="flex flex-row mt-2 w-11/12 h-12 mt-8  justify-around bg-[#F6F7F9]  rounded">
                <view class="flex flex-col justify-around		">
                  <text
                      class="text-lg font-medium	text-[#60A5FA]	">{{ item.trafficScheduleInfoList[0].departureTime }}
                  </text>
                  <text
                      class="text-xs">{{ item.trafficScheduleInfoList[0].departureStationName }}
                  </text>
                </view>

                <view class="flex flex-col content-start items-center ">
                  <text
                      class="text-xs mt-1 text-center	">{{ item.trafficScheduleInfoList[0].runningTime }}
                  </text>
                  <image class="w-16 h-3 -mt-0.5 -mb-0.5" src="/static/img/banner/youjiandou.png"/>
                  <text
                      class="text-xs mb-1 text-center	">{{ item.trafficScheduleInfoList[0].trainNoAlias }}
                  </text>

                  <image v-if="item.trafficScheduleInfoList.length>1" class="w-2 h-3 "
                         src="/static/img/banner/more.png"/>

                </view>

                <view class="flex flex-col justify-around ">
                  <text
                      class="text-lg font-medium		">{{ item.trafficScheduleInfoList[0].arriveTime }}
                  </text>
                  <text class="text-xs ">{{ item.trafficScheduleInfoList[0].arriveStationName }}</text>
                </view>
              </view>
            </view>
          </view>
        </u-list-item>
      </u-list>
      <view class=" w-full h-auto">
        <u-divider text="已经到底了"></u-divider>
      </view>
    </view>


    <!-- 排序栏 -->
    <view class="w-full h-auto">
      <u-tabbar :value="value6" @change="name => value6 =name" :fixed="true" :placeholder="true"
                :safeAreaInsetBottom="true" class="rounded">
        <u-tabbar-item text="筛选" icon="home"></u-tabbar-item>
        <u-tabbar-item text="时间" icon="clock"></u-tabbar-item>
        <!-- <u-tabbar-item text="直播" icon="play-right"></u-tabbar-item> -->
        <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
      </u-tabbar>
    </view>

    <!--    弹窗-->
    <u-popup :show="showCityInfo" @close="close" @open="open" mode='bottom' round="15" :closeable="closeable">

      <view class="bg-[#EFF0F5] w-screen h-[70vh] overflow-y-auto rounded-md	">

        <!--             弹窗内容信息-->
        <cityInfo :cityInfo="clickCityInfo"></cityInfo>
      </view>

    </u-popup>

  </view>
</template>

<script>
import config from "@/common/config.js"; // 配置文件

export default {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
      isLoading: true,
      loadStatus: 'loadmore', //loadmore:加载前的状态，loading:加载中的状态，nomore:没有更多的状态
      departureTimeSliceList: [],
      arriveTimeSliceList: [],
      departureCityName: '北京市',
      titleName: '',
      departureDate: '2022-09-27',
      targetCityName: '上海市',
      arriveCurrentDay: false,
      pageSize: 5,
      pageIndex: 1,
      cityList: [],
      clickCityInfo: Object,
      value6: '0',
      showCityInfo: false,
      closeable: true,
      scrollHeight: ''
    }
  },
  methods: {

    onLoad() {
      this.getGrouponList();
    },
    getGrouponList() {
      let that = this;

      // this.departureCityName = that.$Route.query.departureCityName,
      // 	this.departureDate = that.$Route.query.departureDate,
      // 	this.targetCityName = that.$Route.query.targetCityName,
      this.titleName = this.departureCityName + '出发'

      let params = {
        "departureCityName": this.departureCityName,
        "departureDate": this.departureDate,
        "targetCityName": this.targetCityName == '不限' ? '' : this.targetCityName,
        "arriveCurrentDay": this.arriveCurrentDay,
        "pageSize": this.pageSize,
        "pageIndex": this.pageIndex
      }
      that.isLoading = true;
      that.loadStatus = 'loading';
      console.log("that" + config.queryCityList)

      this.$http.httpPost(config.queryCityList,
          params
      ).then(res => {

        this.isLoading = false;
        uni.hideLoading()
        uni.stopPullDownRefresh()
        if (res.success == true) {
          this.cityList = res.data
          this.pageIndex = res.pageIndex
          this.pageSize = res.pageSize;
          console.log("city")

          console.log(this.cityList)

          // that.loadStatus = that.currentPage < res.data.last_page ? 'loadmore' : 'nomore';
        } else {
          console.log("请求异常")
        }
      });
    },
    queryCityInfo(item) {
      console.log("当前城市", item.cityName)
      this.clickCityInfo = item
      this.showCityInfo = true
    },
    open() {
      console.log('open')
    },
    close() {
      console.log('close')
      this.showCityInfo = false

    },
    moveHandle() {
      console.log("阻止底层滑动")
      return false
    },

    scrolltolower() {
      this.loadmore()
    },
    loadmore() {
      console.log("到底部了")
    },
    onReady() {
      // 计算scroll-view高度
      uni.getSystemInfo({
        success: res => {
          console.log("系统", res)


          this.windowHeight = res.windowHeight
          this.windowWidth = res.windowWidth
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>


.box {
  width: 100%;
  height: calc(100% / 2);
  background-color: black;
}

</style>
