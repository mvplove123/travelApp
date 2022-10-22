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


<!--      </view>-->


    </view>

    <view class=" bg-[#fff] flex flex-col w-11/12 h-2/3 -mt-7 rounded-t-lg  items-center">

      <scroll-view :scroll-top="0" scroll-y="true" lower-threshold="60" @scrolltolower="loadMore" :show-scrollbar="true" :enable-flex="true"
                   class=" w-11/12 h-[66vh] flex flex-col ">

                  <!--      整个内容区-->
                  <view class="w-full h-full flex flex-col bg-[#fff] items-center mb-2">
                    <!--        单个内容块-->
                    <view class="h-40 w-full  justify-center flex flex-row" v-for="(item,index) in cityList" :key="index">

                      <!--        块内图片及右侧描述-->
                      <view class="w-full h-32  bg-[#fff] flex flex-row rounded-xl mb-5 mt-5">
                        <!-- 图片 -->
                        <view class="w-4/12	 h-full rounded-xl flex justify-center items-center bg-[#fff]">
                           <image class="w-4/5 h-full rounded-xl" :src="item.cityImg"/>
                          <view >
<!--                            <image class="w-4/5 h-full rounded-xl" :src="item.cityImg"/>-->
                          </view>
                        </view>

                        <!-- 右侧描述 -->
                        <view class="w-8/12 h-full flex flex-col [#fff] " @click="queryCityInfo(item)">

                          <!-- 城市天气 -->
                          <view>
                            <view class="flex flex-row justify-between  items-center mr-3">

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
                                  class="text-lg font-medium	text-[#60A5FA]	">{{item.trafficScheduleInfoList[0].departureTime }}
                              </text>
                              <text
                                  class="text-xs">{{ item.trafficScheduleInfoList[0].departureStationName }}
                              </text>
                            </view>

                            <view class="flex flex-col content-start items-center ">
                              <text class="text-xs mt-1 text-center	">{{ item.trafficScheduleInfoList[0].runningTime }}</text>
                              <image class="w-16 h-3 -mt-0.5 -mb-0.5" src="/static/img/banner/youjiandou.png"/>
                              <text class="text-xs mb-1 text-center	">{{ item.trafficScheduleInfoList[0].trainNoAlias }}</text>
                              <image v-if="item.trafficScheduleInfoList.length>1" class="w-2 h-3 " src="/static/img/banner/more.png"/></view>

                            <view class="flex flex-col justify-around ">
                              <text class="text-lg font-medium">{{ item.trafficScheduleInfoList[0].arriveTime }}</text>
                              <text class="text-xs ">{{ item.trafficScheduleInfoList[0].arriveStationName }}</text>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>

<!--                    loadmore加载需要与循环快同一层，循环完成后在展示-->

                    <view @click="loadMore" class="w-full h-2 -mt-5">
                      <u-empty mode="cityList" icon="http://cdn.uviewui.com/uview/empty/list.png" text="没有数据"
                               v-if="!cityList.length && !isLoading"></u-empty>
                      <u-loadmore v-if="cityList.length" height="80rpx" :status="loadStatus" icon-type="flower" color="#ccc"/>
                    </view>
                  </view>

        <!--      列表展示-->
      </scroll-view>
    </view>





    <!-- 排序栏 -->
    <u-tabbar :value="value6" @change="name => value6 =name" :fixed="true" :placeholder="true"
              :safeAreaInsetBottom="true" :border="true">
      <u-tabbar-item text="筛选" icon="home"></u-tabbar-item>
      <u-tabbar-item text="时间" icon="clock"></u-tabbar-item>
      <!-- <u-tabbar-item text="直播" icon="play-right"></u-tabbar-item> -->
      <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
    </u-tabbar>


    <!--    弹窗-->
    <u-popup :show="showCityInfo" @close="close" @open="open" mode='bottom' round="50" :closeable="closeable">
      <scroll-view :scroll-top="0" scroll-y="true" class=" bg-[#EFF0F5] w-screen h-[80vh]  rounded-md">
        <!--             弹窗内容信息-->
        <cityInfo v-if="showCityInfo" :cityInfo="clickCityInfo" @closeSpatialQuery3D_="closeSpatialQuery3D"/>

      </scroll-view>
    </u-popup>


  </view>
</template>

<script>
import config from "@/common/config.js"; // 配置文件

export default {
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
      departureCityName: '北京市',
      titleName: '',
      departureDate: '2022-09-27',
      targetCityName: '上海市',
      arriveCurrentDay: false,
      pageSize: 5,
      pageIndex: 1,
      totalPages: 1,
      cityList: [],
      hourList: [{'name': '全部城市圈','hour':0}, {'name': '1小时城市圈','hour':1}, {'name': '2小时城市圈','hour':2}, {'name': '3小时城市圈','hour':3}, {'name': '4小时城市圈','hour':4}, {'name': '次日达城市圈','hour':24}],
      clickCityInfo: Object,
      value6: '0',
      showCityInfo: false,
      closeable: true,
      scrollHeight: '',
      hour: 0,
    }
  },

  onLoad() {
    this.getDetailList();
  },

  methods: {


    initQueryData(){
      this.cityList=[]
      this.pageIndex=1
      this.pageSize=5

    },


    queryHourCityList(duation) {
      if(duation.hour === this.hour){
        return
      }

      this.initQueryData()


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

      console.log("pageIndex,totalPages", this.pageIndex, this.totalPages, this.loadStatus)
      if (this.pageIndex < this.totalPages) {
        this.pageIndex += 1;
        this.getDetailList();
      }
    },
    getDetailList() {
      let that = this;

      this.departureCityName = that.$Route.query.departureCityName,
          this.departureDate = that.$Route.query.departureDate,
          this.targetCityName = that.$Route.query.targetCityName,
          this.titleName = this.departureCityName + '出发'

      let params = {
        "departureCityName": this.departureCityName,
        "departureDate": this.departureDate,
        "targetCityName": this.targetCityName == '不限' ? '' : this.targetCityName,
        "arriveCurrentDay": this.arriveCurrentDay,
        "pageSize": this.pageSize,
        "pageIndex": this.pageIndex,
        "hour":this.hour
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
      console.log('close')
      this.showCityInfo = false

    },
    moveHandle() {
      console.log("阻止底层滑动")
      return false
    },
    //自定义下拉刷新被触发
    scrollRefresh() {
      console.log("scrollRefresh")

      if (this.refreshing) return;
      this.refreshing = true
      if (!this.triggered) {
        this.triggered = true
      }
      //下拉刷新逻辑
      this.loadMore()
      //结束下拉刷新状态
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
      }, 3000)
    },
    //自定义下拉刷新被复位
    onRestore() {
      console.log("onRestore")

      this.triggered = "restore" //需要重置，设置为true app上又会执行刷新
    },

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
