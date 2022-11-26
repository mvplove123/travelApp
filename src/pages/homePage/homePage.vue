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
    <view class="h-[35vh] w-11/12 bg-white rounded-lg m-auto mt-2 shadow-l">


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
        <view class="flex flex-col ml-4 w-full" @click="calendarOpen">
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
      <view class="w-full  h-[15vh]  flex flex-row justify-center items-center">
        <view class=" h-auto  w-11/12 ">
          <u-button size="large" class="" color="#60A5FA" @click="jump">
            <text class="text-l mt-1 font-semibold">查询</text>
          </u-button>
        </view>
      </view>




    </view>

    <!-- 当前目的地可去城市列表，只列第二天热门数据 -->
    <u-divider :text="cityIntroduce"></u-divider>

    <!-- 城市说明 -->
    <view class="w-11/12 h-[30vh]  flex  flex-col bg-cover 	rounded-md items-center"
          :style="{ backgroundImage: `url(${cityDetail.cityImg})` }">

      <view class="w-11/12 h-1/2 flex flex-row justify-between">
        <view class="w-2/3 h-1/3 mt-8">
          <text class="text-2xl	font-sans text-white font-bold tracking-normal	bg-[#3D4144] bg-opacity-40 rounded ">{{
              cityDetail.cityName
            }}
          </text>
        </view>

        <!-- 景区天气 -->
        <view class="w-1/4 h-1/2 mt-8  flex flex-col items-end bg-gray-600 bg-opacity-40 rounded text-white">
          <view v-if="cityDetail.weatherInfoList" class="-mb-4">
            <text class="text-base font-sans mr-1">{{ cityDetail.weatherInfoList[0].dayWeather }}</text>
            <image class="w-5 h-5 " :src="require(`../../static/img/weather/${cityDetail.weatherInfoList[0].code}.png`)"></image>
          </view>
          <view v-if="cityDetail.weatherInfoList" class="mt-3 flex flex-col">
            <text class="text-sm font-sans  mr-2">{{ cityDetail.weatherInfoList[0].temperature }}</text>
          </view>
        </view>



      </view>
      <!-- 城市描述 -->
      <view class="w-11/12 h-auto   flex flex-row bg-gray-600 bg-opacity-40 justify-end items-center p-1 rounded">
        <text class="w-full h-full text-white text-xs leading-normal	tracking-wide font-mono"> {{ cityDetail.cityDesc }}</text>
      </view>
    </view>


    <u-divider></u-divider>

    <!-- 当地天气 -->
    <view v-if="cityDetail.weatherInfoList"  class="w-11/12 h-auto  flex flex-shrink-0 flex-col bg-cover rounded  bg-white	">
      <view class=" m-2">
        <text class="text-xl	font-sans  font-bold tracking-normal text-[#636363]">当地天气</text>
      </view>

      <!-- 天气列表  mx-2 my-1 text-center text-xs-->
      <view class="flex flex-row justify-between">
        <view class="mx-1 my-1"  v-for="(weatherInfo, index) in cityDetail.weatherInfoList" :key="index">

          <view class="flex flex-col text-center">
            <view v-if="weatherInfo!=null" class="">
              <text class="text-xs font-sans mr-1 mb-1">{{ weatherInfo.dayWeather }}</text>
              <image class="w-6 h-6 " :src="require(`../../static/img/weather/${weatherInfo.code}.png`)"></image>
            </view>
            <view v-if="weatherInfo!=null" class="">
              <text class="text-xs font-sans">{{ weatherInfo.temperature }}</text>
            </view>
            <view :class="{'bg-indigo-300	 bg-opacity-40 rounded text-red-600': departDate === weatherInfo.weatherDate}">
              <view v-if="weatherInfo!=null" class="">
                <text class="text-xs font-sans">{{ weatherInfo.week }}</text>
<!--                <text class="text-xs-0.6 font-sans text-red-600" v-if="departDate === weatherInfo.weatherDate">出发</text>-->
              </view>
              <view v-if="weatherInfo!=null" class="">
                <text class="text-xs font-sans">{{ weatherInfo.weatherDateStr }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>



    <u-divider></u-divider>


    <!-- 热门景点 -->
    <view class="w-11/12 h-[30vh]  flex flex-shrink-0 flex-col bg-cover rounded	"
          :style="{ backgroundImage: `url(${hotSceneryBgImg})` }">

      <view class=" m-2">
        <text class="text-xl	font-sans text-white tracking-normal font-bold bg-[#3D4144] bg-opacity-40 rounded p-0.5">热门景点</text>
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


      <view class="flex-1	 flex-col w-11/12 h-3/5 justify-start  items-end m-auto">

        <view class="flex flex-col w-full h-3/5 mt-14 ">

          <!--        级别分数-->
          <view class="flex flex-row h-1/5 w-full text-center items-center m-1">
            <view class="w-8 h-auto bg-gray-600  bg-opacity-40 rounded items-center mx-0.5"><text class="text-white  text-xs ">{{sceneryStar}}</text></view>
            <view class="w-8 h-auto bg-blue-400 rounded"><text class="text-white font-medium text-xs	  ">{{scenerySore}}</text></view>

          </view>

          <view class="w-full h-2/5 overflow-auto">
            <text class="text-white text-xs bg-gray-600 bg-opacity-40 rounded">{{sceneryDesc}}</text>
          </view>
        </view>
      </view>

    </view>

    <u-divider></u-divider>


    <!-- 当地美食 -->
    <view v-if="cityDetail.foodInfoList.length>0"  class="w-11/12 h-auto  flex flex-shrink-0 flex-col bg-cover rounded  bg-white	">
      <view class=" m-2">
        <text class="text-xl	font-sans  font-bold tracking-normal text-[#636363]">当地美食</text>
      </view>

      <!-- 美食列表 -->
      <u-scroll-list >
        <view class="justify-between mx-2 my-1 text-center text-xs"  @click="changeFoodInfo(foodInfo,index)"   v-for="(foodInfo, index) in cityDetail.foodInfoList" :key="index">
          <image class="rounded-full h-16 w-16 flex items-center justify-center bg-cover my-2"
                 :src="foodInfo.foodImg"></image>

          <text :class=" {'text-blue-500': rSelect.indexOf(index)!=-1}" >{{ foodInfo.foodName }}</text>

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
      sceneryStar:'OA',
      scenerySore:'0',
      sceneryDesc:'',
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
      cityStationList:[],
      rSelect:[],
      showSelectWeather:[]
    };
  },

  onLoad() {

    this.handleTimeForm(dayjs().format('YYYY-MM-DD'))
    this.init()
  },
  methods: {
    confirm(e) {
      let date = dayjs()

      this.handleTimeForm(e[0])

      this.showCalendar = false

    },


    calendarOpen() {
      this.showCalendar = true
    },
    calendarClose() {
      this.showCalendar = false
    },


    openShowCityList(titleName) {
      this.cityTitleName = titleName
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

    // 路由跳转
    jump() {
      this.$Router.push({
        path: '/pages/detail/detail',
        query: {
          "departureCityName": this.departCity,
          "departureDate": this.departDate,
          "targetCityName": this.targetCity,
          "cityStationList":this.cityStationList
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
          this.cityDetail = res.data
          this.currentIndex=0

          if (this.cityDetail.sceneryInfoList.length>0) {
            const sceneryInfo = this.cityDetail.sceneryInfoList[0]
            this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl
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
    changeSceneryBackImg(index) {

      const sceneryInfo = this.hotSceneryMap.get(index.name)
      this.hotSceneryBgImg = sceneryInfo.sceneryImgUrl ? sceneryInfo.sceneryImgUrl : this.cityInfo.cityImg
      this.sceneryStar = sceneryInfo.rate
      this.scenerySore = sceneryInfo.score
      this.sceneryDesc = sceneryInfo.sceneryDesc
    },

    changeFoodInfo(foodInfo,index) {
      this.hotFoodImg = foodInfo.foodImg ? foodInfo.foodImg : this.cityInfo.cityImg
      this.hotFoodDesc = foodInfo.foodDesc
      this.rSelect=[]
      if (this.rSelect.indexOf(index) == -1) {
        this.rSelect.push(index);//选中添加到数组里
      } else {
        this.rSelect.splice(this.rSelect.indexOf(index), 1); //取消
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
