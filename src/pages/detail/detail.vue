<template>
  <!--  外边框-->
  <view class="bg-[#EFF0F5]  w-full h-screen  flex flex-col items-center" @touchmove.stop.prevent="moveHandle">

    <u-navbar :title=titleName @rightClick="rightClick" :autoBack="true" bgColor="#fff"></u-navbar>

    <!-- 导航栏 -->

    <view class="w-full h-1/3  bg-blue-400 ">

      <!-- 图片栏 -->
      <view class="flex flex-col w-full	h-full"
            style=" background-image: url(http://file.shopro.top/imgs/group/group_list_bg.png)">
      </view>

      <!--      <view class="w-full h-full flex flex-col justify-center items-center">-->


      <!-- 图片栏 -->
      <!--        <view class="w-full h-full flex flex-shrink-0 flex-col bg-cover rounded	"-->
      <!--              style=" background-image: url(https://p1-q.mafengwo.net/s14/M00/1B/5B/wKgE2l1FV8iAQ-kNAAhNZK2lPtY117.jpg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90)">-->
      <!--        </view>-->

      <view class="-mt-24">
        <!-- 景区列表 -->
        <u-tabs :list="hourList" lineWidth="20" lineColor="transparent" lineHeight="7" :activeStyle="{
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
                @click="queryHourCityList"></u-tabs>
      </view>

    </view>

    <view class=" bg-[#fff] flex flex-col w-11/12 h-2/3 -mt-7 rounded-t-lg  items-center">

      <scroll-view :scroll-top="0" scroll-y="true" lower-threshold="60" @scrolltolower="loadMore" :show-scrollbar="true"
                   :enable-flex="true"
                   class=" w-11/12 h-[66vh] flex flex-col ">

        <!--      整个内容区-->
        <view class="w-full h-full flex flex-col bg-[#fff] items-center mb-2">
          <!--        单个内容块-->
          <view class="h-40 w-full  justify-center flex flex-row" v-for="(item,index) in cityList" :key="index">

            <!--        块内图片及右侧描述-->
            <view class="w-full h-36  bg-[#fff] flex flex-row rounded-xl my-5">
              <!-- 图片 -->
              <view class="w-4/12	 h-full rounded-xl flex justify-center items-center bg-[#fff]">
                <image class="w-11/12 h-full rounded-xl" :src="item.cityImg"/>
                <view>
                </view>
              </view>

              <!-- 右侧描述 -->
              <view class="w-8/12 h-full flex flex-col [#fff] ml-2.5" @click="queryCityInfo(item)">

                <!-- 城市天气 -->
                <view class="w-full h-1/5 flex flex-row justify-between  items-center">

                  <view>
                    <text class="text-lg font-sans">{{ item.cityName }}</text>
                  </view>
                  <view>
                    <u-rate class="" v-model="item.rate" allowHalf readonly size="10" gutter="0"></u-rate>
                  </view>

                  <view class="flex flex-col">
                    <view v-if="item.weatherInfo!=null" class="-mb-5">
                      <text class="text-xs font-sans mr-1">{{ item.weatherInfo.dayWeather }}</text>
                      <image class="w-4 h-4 " :src="require(`../../static/img/weather/${item.weatherInfo.code}.png`)"></image>
                    </view>
                    <view v-if="item.weatherInfo!=null" class="mt-3">
                      <text class="text-xs font-sans">{{ item.weatherInfo.temperature }}</text>
                    </view>
                  </view>


                </view>


                <!-- 景点，城市描述 -->

                <view class="flex flex-row flex-wrap w-full h-1/5 overflow-hidden">
                  <view
                      class="flex items-center border border-[#C5EBDE] mx-0.5 my-2 w-auto h-2/3 p-0.5  text-xs text-[#45B47D] "
                      v-for="(sceneryName,index) in item.sceneryList"
                      :key="index">
                    <text class="">
                      {{ sceneryName }}
                    </text>
                  </view>
                </view>

                <!-- 行程票价 -->
                <view class="flex  flex-row w-full h-3/5 items-end">

                  <view class="flex flex-row w-full h-2/3  justify-around bg-[#F6F7F9] 	 rounded ">
                    <view class="flex flex-col justify-around		">
                      <text
                          class="text-lg font-medium	text-[#60A5FA]	">{{
                          item.trafficScheduleInfoList[0].departureTime
                        }}
                      </text>
                      <text
                          class="text-xs">{{ item.trafficScheduleInfoList[0].departureStationName }}
                      </text>
                    </view>

                    <view class="flex flex-col content-start items-center ">
                      <text class="text-xs mt-1 text-center	">{{ item.trafficScheduleInfoList[0].runningTime }}</text>
                      <image class="w-16 h-3 -mt-0.5 -mb-0.5" src="/static/img/banner/youjiandou.png"/>
                      <text class="text-xs mb-1 text-center	">{{ item.trafficScheduleInfoList[0].trainNoAlias }}</text>
                      <image v-if="item.trafficScheduleInfoList.length>1" class="w-2 h-3 "
                             src="/static/img/banner/more.png"/>
                    </view>

                    <view class="flex flex-col justify-around ">
                      <text class="text-lg font-medium">{{ item.trafficScheduleInfoList[0].arriveTime }}</text>
                      <text class="text-xs ">{{ item.trafficScheduleInfoList[0].arriveStationName }}</text>
                    </view>
                  </view>


                </view>

              </view>
            </view>
          </view>

          <!--                    loadmore加载需要与循环快同一层，循环完成后在展示-->

          <view @click="loadMore" class="w-full h-2 -mt-3">
            <u-empty mode="cityList" icon="http://cdn.uviewui.com/uview/empty/list.png" text="没有数据"
                     v-if="!cityList.length && !isLoading"></u-empty>
            <u-loadmore v-if="cityList.length" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc"/>
          </view>
        </view>

        <!--      列表展示-->
      </scroll-view>
    </view>


    <!-- 排序栏 -->
    <u-tabbar :value="defaultTabbar" @change="name => defaultTabbar =name" :fixed="true" :placeholder="true"
              :safeAreaInsetBottom="true" :border="true">
      <u-tabbar-item :text=timeSort :name=0 icon="clock" @click="clickTimeSort"></u-tabbar-item>
      <u-tabbar-item text="智能推荐" :name=1 icon="star-fill" dot @click="clickDefaultSort"></u-tabbar-item>
      <u-tabbar-item text="筛选" :name=2 icon="tags" @click="clickFilterSelect" :badge=badgeCount></u-tabbar-item>
    </u-tabbar>


    <!--    弹窗-->
    <u-popup :show="showCityInfo" @close="close" @open="open" mode='bottom' round="50" :closeable="closeable">
      <scroll-view :scroll-top="0" scroll-y="true" class=" bg-[#EFF0F5] w-screen h-[80vh]  rounded-md">
        <!--             弹窗内容信息-->
        <cityInfo v-if="showCityInfo" :cityInfo="clickCityInfo" @closeSpatialQuery3D_="closeSpatialQuery3D"/>

      </scroll-view>
    </u-popup>

    <!--    筛选弹窗-->
    <u-popup :show="showFilterSelect" @close="closeFilterSelect" @open="open" mode='bottom' round="50"
             :closeable="closeable">

      <view class=" bg-[#EFF0F5] w-screen h-[75vh]  rounded-md">
        <!--             弹窗内容信息-->
        <filterSelect v-if="showFilterSelect" :filterSelectInfo="filterSelectInfoResult"
                      :departureStationList="cityAllDepartureStations"
                      @confirmFilterSelect="confirmFilterSelectResult" @closeSpatialQuery3D_="closeSpatialQuery3D"/>

      </view>

    </u-popup>


  </view>
</template>

<script>

import config from "@/common/config.js";
import filterSelect from '@/components/filterSelect/filterSelect.vue'

export default {
  components: {
    filterSelect
  },


  data() {
    return {
      isShowSpatialQuery3DPanle: false,
      refreshing: false,
      triggered: true,
      windowHeight: 0,
      windowWidth: 0,
      isLoading: true,
      loadStatus: 'loadmore', //loadmore:加载前的状态，loading:加载中的状态，nomore:没有更多的状态
      departureTimeSliceList: [],
      arriveTimeSliceList: [],
      trainTypes: [],
      departureCityName: '北京市',
      titleName: '',
      departureDate: '2022-09-27',
      targetCityName: '',
      arriveCurrentDay: false,
      pageSize: 5,
      pageIndex: 1,
      totalPages: 1,
      cityList: [],
      hourList: [{'name': '全部城市圈', 'hour': 0}, {'name': '1小时城市圈', 'hour': 1}, {
        'name': '2小时城市圈',
        'hour': 2
      }, {'name': '3小时城市圈', 'hour': 3}, {'name': '4小时城市圈', 'hour': 4}, {'name': '次日达城市圈', 'hour': 24}],
      clickCityInfo: Object,
      filterSelectInfoResult: {},
      showCityInfo: false,
      closeable: true,
      showFilterSelect: false,
      scrollHeight: '',
      hour: 0,
      badgeCount: 0,
      departureStations: [],
      selectDepartureStations: [],
      // 城市所有车站
      cityAllDepartureStations: [],
      timeSort: '时间',
      defaultTabbar: null,
      sortWay: 0


    }
  },

  onLoad() {
    this.defaultTabbar = 1
    this.getDetailList();
    let that = this;
    this.queryCityStation(that.$Route.query.departureCityName);
  },

  methods: {


    intSortQueryData() {
      this.sortWay = 0
      this.timeSort = "时间"
      this.initQueryData()
    },


    initQueryData() {
      this.cityList = []
      this.pageIndex = 1
      this.pageSize = 5
    },

    queryCityStation(cityName) {
      this.cityAllDepartureStations = []
      let that = this;
      let params = {
        "cityName": cityName,
      }
      that.isLoading = true;
      that.loadStatus = 'loading';

      this.$http.httpGet(config.queryCityStationList,
          params
      ).then(res => {

        this.isLoading = false;
        uni.hideLoading()
        uni.stopPullDownRefresh()
        if (res.success == true) {
          for (let station of res.data) {
            this.cityAllDepartureStations.push({name: station, checked: false})
          }
        } else {
          console.log("请求异常")
        }
      });
    },


    queryHourCityList(duation) {
      if (duation.hour === this.hour) {
        return
      }

      this.intSortQueryData()
      this.defaultTabbar = 1

      if (duation.name == '1小时城市圈') {
        this.hour = 1
      } else if (duation.name == '2小时城市圈') {
        this.hour = 2
      } else if (duation.name == '3小时城市圈') {
        this.hour = 3
      } else if (duation.name == '4小时城市圈') {
        this.hour = 4
      } else if (duation.name == '次日达城市圈') {
        this.hour = 24
      } else {
        this.hour = 0
      }

      this.getDetailList();


    },


    // 加载更多
    loadMore() {

      if (this.pageIndex < this.totalPages) {
        this.pageIndex += 1;
        this.getDetailList();
      }
    },
    getDetailList() {
      let that = this;

      console.log("选择框",       this.defaultTabbar)
      // this.departureCityName = '北京市',
      //     this.departureDate = '2022-09-27',
      //     this.targetCityName = '不限',
      //     this.titleName = this.departureCityName + '出发'

      this.departureCityName = that.$Route.query.departureCityName,
          this.departureDate = that.$Route.query.departureDate,
          this.targetCityName = that.$Route.query.targetCityName,
          this.titleName = this.departureCityName + '出发'

      let params = {
        "departureCityName": this.departureCityName,
        "departureDate": this.departureDate,
        "targetCityName": this.targetCityName == '不限' ? '' : this.targetCityName,
        "arriveCurrentDay": this.arriveCurrentDay,
        "departureTimeSliceList": this.departureTimeSliceList,
        "arriveTimeSliceList": this.arriveTimeSliceList,
        "stationList": this.departureStations,
        "trainTypeList":this.trainTypes,
        "pageSize": this.pageSize,
        "pageIndex": this.pageIndex,
        "hour": this.hour,
        "sortWay": this.sortWay
      }
      that.isLoading = true;
      that.loadStatus = 'loading';
      uni.hideLoading()

      this.$http.httpPost(config.queryCityList,
          params
      ).then(res => {
        this.isLoading = false;
        uni.hideLoading()
        uni.stopPullDownRefresh()
        if (res.success == true) {
          this.pageIndex = res.pageIndex
          this.pageSize = res.pageSize;
          this.cityList = [...this.cityList, ...res.data];
          this.totalPages = res.totalPages;
          this.loadStatus = this.pageIndex < res.totalPages ? 'loadmore' : 'nomore';
        } else {
          console.log("请求异常")
        }
      });
    },

    queryCityInfo(item) {
      this.clickCityInfo = item
      this.showCityInfo = true
    },
    open() {
      console.log('open')
    },
    // 关闭组件（销毁）
    closeSpatialQuery3D() {
      this.isShowSpatialQuery3DPanle = false
    },


    close() {
      this.showCityInfo = false

    },

    clickFilterSelect() {
      this.defaultTabbar = 1
      this.showFilterSelect = true
    },

    clickTimeSort() {
      this.initQueryData()
      if (this.timeSort == "时间") {
        this.timeSort = "出发 早->晚"
        this.sortWay = 1
        this.getDetailList()
        return
      }

      if (this.timeSort == "出发 早->晚") {
        this.timeSort = "出发 晚->早"
        this.sortWay = 2
        this.getDetailList()
        return;
      }

      if (this.timeSort == "出发 晚->早") {
        this.timeSort = "出发 早->晚"
        this.sortWay = 1
        this.getDetailList()
        return;

      }


    },
    clickDefaultSort() {
      this.intSortQueryData()
      this.getDetailList()
    },

    closeFilterSelect() {
      this.showFilterSelect = false

    },
    moveHandle() {
      return false
    },
    //自定义下拉刷新被复位
    onRestore() {

      this.triggered = "restore" //需要重置，设置为true app上又会执行刷新
    },

    confirmFilterSelectResult(selectTrainTypes, selectDepartureTimes, selectArriveTimes, selectDepartureStations) {

      this.intSortQueryData()
      this.defaultTabbar = 1


      this.trainTypes = []
      this.departureStations = []
      this.departureTimeSliceList = []
      this.arriveTimeSliceList = []

      for (let selectTrainType of selectTrainTypes) {
        this.trainTypes.push(selectTrainType.trainType)
      }

      for (let selectDepartureTime of selectDepartureTimes) {
        const timeStart = selectDepartureTime.nameSeconds.split("-")[0]
        const timeEnd = selectDepartureTime.nameSeconds.split("-")[1]
        let timeSlice = {
          "timeStart": timeStart,
          "timeEnd": timeEnd,
        }
        this.departureTimeSliceList.push(timeSlice)
      }

      for (let selectArriveTime of selectArriveTimes) {
        const timeStart = selectArriveTime.nameSeconds.split("-")[0]
        const timeEnd = selectArriveTime.nameSeconds.split("-")[1]
        let timeSlice = {
          "timeStart": timeStart,
          "timeEnd": timeEnd,
        }
        this.arriveTimeSliceList.push(timeSlice)
      }

      for (let selectDepartureStation of selectDepartureStations) {
        this.departureStations.push(selectDepartureStation.name)
      }

      this.showFilterSelect = false
      this.badgeCount = this.trainTypes.length + this.departureTimeSliceList.length + this.arriveTimeSliceList.length + this.departureStations.length


      this.filterSelectInfoResult = {
        "selectTrainTypes": selectTrainTypes,
        "selectDepartureTimes": selectDepartureTimes,
        "selectArriveTimes": selectArriveTimes,
        "selectDepartureStations": selectDepartureStations
      }
      this.getDetailList()


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
