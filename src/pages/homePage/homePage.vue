<template>
  <view class=" bg-[#EFF0F5]  w-full h-full  flex flex-col align-baseline my-2 items-center">

    <!-- 滚动图 -->
    <view class=" w-full h-30 bg-[#34D399] ">

      <u-swiper :list="list3" indicator indicatorMode="dot" circular radius="0" height="400rpx">
      </u-swiper>

    </view>

    <!-- 通知栏 -->
    <view class="w-full h-10 ">
      <u-notice-bar :text="text1" mode="link"></u-notice-bar>
    </view>


    <!-- 查询栏 u-m-t-30 u-border-radius-big-->
    <view class="h-[30vh] w-11/12 bg-white rounded-lg m-auto mt-2 shadow-l">

      <u-form class="w-full h-full">

        <!-- 第一行 -->
        <view class="flex flex-row justify-between items-center h-[10vh]">
          <view class="flex flex-col ml-4" @click="openShowCityList('出发城市选择')">
            <text class="text-[#C1C1C1] text-xs	">出发城市</text>
            <text class="text-2xl mt-1 font-medium">{{ departCity }}</text>
            <!--             弹窗内容信息-->
            <u-popup :show="chooseCityFlag" @close="closeShowCityList"
                     @open="openShowCityList(cityTitleName)" mode='right'>

              <scroll-view :scroll-top="0" scroll-y="true" class=" bg-[#EFF0F5] w-screen h-screen  rounded-md mt-8">
                <chooseCity :cityTitleName="cityTitleName" @pickedCity="change"></chooseCity>
              </scroll-view>
            </u-popup>
          </view>
          <view class=" mt-5 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
            <!-- 图片 -->
            <image class="w-5 h-5" src="/static/img/banner/departure.png"/>
          </view>
          <view class="flex flex-col mr-4 " @click="openShowCityList('到达城市选择')">
            <text class="text-[#C1C1C1] text-xs	">到达城市</text>
            <text class="text-2xl mt-1 font-semibold">{{ targetCity }}</text>
          </view>
        </view>
<!--        <u-divider lineColor="#dcdfe6"></u-divider>-->
        <u-line></u-line>


        <!-- 出行日期 -->
        <view class=" flex  items-center h-[10vh]">
          <view class="flex flex-col ml-4 w-full" @click="showCalendar = true">
            <view>
              <text class="text-[#C1C1C1] text-xs	">出行日期</text>

            </view>
            <view>
              <text class="text-2xl mt-1 font-semibold">{{ departDateStr }}</text>
              <text class="text-l ml-1 font-semibold">{{ dateNumStr }}</text>
              <text class="text-l ml-1 font-semibold">{{ week }}</text>
            </view>

            <u-calendar :show="showCalendar" :mode="mode" @confirm="confirm" @close="calendarClose"
                        title="选择出行日期">
            </u-calendar>
          </view>
        </view>
        <u-line></u-line>


<!--        &lt;!&ndash; 复选框 &ndash;&gt;-->
<!--        <view class="flex flex-row m-4 h-5 ">-->
<!--          <u-checkbox-group placement="row" iconPlacement="left" v-model="transportType">-->
<!--            <u-checkbox v-for="(item, index) in checkboxList" :key="index" :label="item.name"-->
<!--                        :name="item.type" activeColor="#70A3F3" labelColor="#C1C1C1">-->
<!--            </u-checkbox>-->
<!--          </u-checkbox-group>-->
<!--        </view>-->
        <view class="w-full  h-[10vh]  flex flex-row justify-center items-center">
          <view class=" h-auto  w-11/12 ">
            <u-button size="large" class="" color="#60A5FA" @click="jump">
              <text class="text-l mt-1 font-semibold">查询</text>
            </u-button>
          </view>
        </view>



      </u-form>

    </view>

    <!-- 当前目的地可去城市列表，只列第二天热门数据 -->
    <u-divider :text="cityIntroduce"></u-divider>

    <!-- 城市说明 -->
    <view class="w-11/12 h-[30vh]  flex  flex-col bg-cover 	rounded-md items-center"
          :style="{ backgroundImage: `url(${cityDetail.cityImg})` }">

      <view class="w-11/12 h-1/2 flex flex-row">
        <view class="w-1/3 h-1/3 mt-8 ">
          <text class="text-2xl	font-sans text-white	bg-[#3D4144] bg-opacity-40 rounded">{{
              cityDetail.cityName
            }}
          </text>
        </view>

        <!-- 景区列表 -->
        <view class="w-2/3 h-1/3 mt-8  flex flex-row justify-end">
          <text>晴</text>
          <image class="w-5 h-5" src="/static/img/weather/qingtian.png"/>

        </view>
      </view>
      <!-- 城市描述 -->
      <view class="w-11/12 h-auto  mt-10 mb-2 flex flex-row text-white text-xs  bg-gray-600 bg-opacity-40 justify-end items-center">
        <text> {{ cityDetail.cityDesc }}</text>
      </view>
    </view>


    <u-divider></u-divider>


    <!-- 热门景点 -->
    <view class="w-11/12 h-[30vh]  flex flex-shrink-0 flex-col bg-cover rounded	"
          :style="{ backgroundImage: `url(${hotSceneryBgImg})` }">

      <view class=" m-2">
        <text class="text-2xl	font-sans text-white">热门景点</text>
      </view>

      <!-- 景区列表 -->
      <u-tabs :list="hotSceneryList" lineWidth="20" lineColor="transparent" lineHeight="7" :current=currentIndex  :activeStyle="{
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
    <view class="w-11/12 h-[40vh]  flex flex-shrink-0 flex-col bg-cover rounded  bg-white	">
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
import chooseCity from '@/components/chooseCity/chooseCity.vue'

import dayjs from 'dayjs'
import config from "@/common/config";

export default {
  components: {
    chooseCity
  },
  data() {
    return {

      text1: "开始旅行了",
      bgColor: '#EF4444',
      list3: [
        'https://i0.wp.com/travelprogrammer.com/wp-content/uploads/2022/08/wxsync-2022-08-06b32ffbb2fd00c436ed51ae39847e61.jpeg?w=1290&ssl=1',
        'https://i0.wp.com/travelprogrammer.com/wp-content/uploads/2022/08/wxsync-2022-08-a906246d7de585cdae1fc1b2fc13d41c.jpeg?w=1290&ssl=1',
        'https://i0.wp.com/travelprogrammer.com/wp-content/uploads/2022/08/wxsync-2022-08-4aaa745937174e4406fc45902c242103.jpeg?w=1290&ssl=1',
      ],
      list: [],
      topPic: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62b84e105a7e3f0310a9c09a/63266ef5d85c64001131d666/16634751967384036698.png',
      departDate: '',
      departDateStr: '',
      dateNumStr: '',
      week: '',
      departCity: '北京市',
      targetCity: '不限',
      showCalendar: false,
      chooseCityFlag: false,
      mode: 'single',
      transportType: [],
      // 基本案列数据
      checkboxList: [{
        name: '火车',
        type: 1,
        disabled: false
      },
        {
          name: '飞机',
          type: 2,
          disabled: false
        }
      ],
      hotCitys: [
        '杭州',
        '天津',
        '北京',
        '上海',
        '深圳',
        '广州',
        '成都',
        '重庆',
        '厦门'
      ],
      currentCity: '杭州市',
      cityTitleName: '',
      departCityChooseFlag: false,
      targetCityChooseFlag: false,
      hotSceneryList: [],
      hotSceneryMap: new Map(),
      cityIntroduce: '出发城市介绍',
      hotFoodDesc: '',
      hotFoodList: [],
      hotFoodMap: new Map(),
      cityDetail: Object,
      hotSceneryBgImg: '',
      currentIndex:0,


    };
  },

  onLoad() {

    this.handleTimeForm(dayjs().format('YYYY-MM-DD'))
    this.init()
  },
  methods: {
    confirm(e) {
      console.log(e)
      let date = dayjs()

      this.handleTimeForm(e[0])

      this.showCalendar = false
    },

    openShowCityList(titleName) {
      this.cityTitleName = titleName
      console.log(this.cityTitleName)
      this.chooseCityFlag = true;
      if (titleName === '出发城市选择') {
        this.departCityChooseFlag = true
      }
      if (titleName === '到达城市选择') {
        this.targetCityChooseFlag = true
      }


    },

    closeShowCityList() {
      this.chooseCityFlag = false;
    },
    change(data) {
      if (this.departCityChooseFlag) {
        this.departCity = data.name
        this.departCityChooseFlag = false
        this.cityIntroduce = '出发城市介绍'
        this.queryCityInfo(data.name)
      }

      if (this.targetCityChooseFlag) {
        this.targetCity = data.name
        this.targetCityChooseFlag = false
        if(data.name != '不限'){
          this.cityIntroduce = '到达城市介绍'
          this.queryCityInfo(data.name)
        }else{
          this.cityIntroduce = '出发城市介绍'
          this.queryCityInfo(this.departCity)
        }
      }
      this.closeShowCityList()
    },

    calendarClose(e) {
      this.showCalendar = false
    },

    // 路由跳转
    jump() {
      this.$Router.push({
        path: '/pages/detail/detail',
        query: {
          "departureCityName": this.departCity,
          "departureDate": this.departDate,
          "targetCityName": this.targetCity
        }
      });
    },

    handleTimeForm(dateFormatStr) {

      //日期获取
      const date = dayjs(dateFormatStr);
      const month = dayjs(dateFormatStr).month() + 1;
      const day = dayjs(dateFormatStr).date();
      this.departDateStr = month + '月' + day + '日'
      this.departDate = dateFormatStr

      //时间比较获取今天、明天、后天
      const currentDate = dayjs().format('YYYY-MM-DD');
      const diffDay = date.diff(currentDate, 'day', true)
      if (diffDay == 0) {
        this.dateNumStr = '今天'
      } else if (diffDay == 1) {
        this.dateNumStr = '明天'
      } else if (diffDay == 2) {
        this.dateNumStr = '后天'
      } else {
        this.dateNumStr = ''
      }

      //星期获取
      const weekDayNum = dayjs(dateFormatStr).day()
      if (weekDayNum == 1) {
        this.week = '周一'
      } else if (weekDayNum == 2) {
        this.week = '周二'
      } else if (weekDayNum == 3) {
        this.week = '周三'
      } else if (weekDayNum == 4) {
        this.week = '周四'
      } else if (weekDayNum == 5) {
        this.week = '周五'
      } else if (weekDayNum == 6) {
        this.week = '周六'
      } else {
        this.week = '周日'
      }
    },
    init() {
      console.log("初始化")

      this.queryCityInfo('北京市')

    },

    queryCityInfo(cityName) {
      this.hotSceneryList=[]
      this.hotFoodList=[]
      this.hotSceneryMap = new Map()
      this.hotSceneryMap = new Map()
      this.currentIndex=1
      this.hotFoodDesc=''

      let that = this;
      let params = {
        "cityName": cityName,
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
          console.log("res",res.data)
          this.cityDetail = res.data
          this.currentIndex=0

          if (this.cityDetail.sceneryInfoList) {
            const sceneryInfo = this.cityDetail.sceneryInfoList[0]
            this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl
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
    changeSceneryBackImg(index) {

      const sceneryInfo = this.hotSceneryMap.get(index.name)
      this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl ? sceneryInfo.sceneryImgUrl : this.cityInfo.cityImg
    },
    changeFoodInfo(foodInfo) {

      this.hotFoodImg = foodInfo.foodImg ? foodInfo.foodImg : this.cityInfo.cityImg
      this.hotFoodDesc = foodInfo.foodDesc
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
