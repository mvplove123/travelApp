<template>


  <view class="w-full h-screen flex flex-col bg-white">


    <view class="flex justify-center">
      <text class="font-medium mt-2 mb-1">高级筛选</text>
    </view>


    <scroll-view :scroll-top="0" scroll-y="true" class="w-screen h-[60vh]">
      <!--  指定车型-->
      <view class="flex flex-col w-11/12 mx-auto my-5">
        <view class="flex self-start ">
          <text class="font-medium my-2">指定车型</text>
        </view>

        <view class="flex flex-row gap-3">
          <view class="" v-for="(item, index) in trainTypes" :key="index">
            <u-tag :text="item.name" :plain="!item.checked"  :name="index" :bgColor="[item.checked ? '#16a085' : '#F6F6F6']"	color="#1F2937" shape="circle"  borderColor="#F6F6F6"
                   @click="trainTypesClick">
            </u-tag>
          </view>
        </view>

      </view>


      <!--  出发时间-->
      <view class="flex flex-col w-11/12 mx-auto my-5">

        <view class="flex self-start ">
          <text class="font-medium my-2">出发时间</text>
        </view>


        <view class="grid grid-cols-3 gap-3 	">
          <view class="text-center" v-for="(item, index) in departureTimes" :key="index">
            <u-tag :text="item.name" :plain="!item.checked" type="primary" :name="index" :bgColor="[item.checked ? '#16a085' : '#F6F6F6']"	color="#1F2937" shape="circle"  borderColor="#F6F6F6"
                   @click="departureTimesClick">
            </u-tag>
          </view>
        </view>

      </view>

      <!--  到达时间-->
      <view class="flex flex-col w-11/12 mx-auto my-5">

        <view class="flex self-start">
          <text class="font-medium my-2">到达时间</text>
        </view>

        <view class="grid grid-cols-3 gap-3 ">
          <view class="" v-for="(item, index) in arriveTimes" :key="index">
            <u-tag :text="item.name" :plain="!item.checked" type="primary" :name="index" :bgColor="[item.checked ? '#16a085' : '#F6F6F6']"	color="#1F2937" shape="circle"  borderColor="#F6F6F6"
                   @click="arriveTimesClick">
            </u-tag>
          </view>
        </view>

      </view>

      <!--  出发站-->
      <view class="flex flex-col w-11/12 mx-auto my-5">

        <view class="flex self-start">
          <text class="font-medium my-2">出发站</text>
        </view>

        <view class="grid grid-cols-3 gap-3">
          <view class="justify-center " v-for="(item, index) in departureStations" :key="index">
            <u-tag :text="item.name" :plain="!item.checked" type="primary" :name="index" :bgColor="[item.checked ? '#16a085' : '#F6F6F6']"	color="#1F2937" shape="circle"  borderColor="#F6F6F6"
                   @click="departureStationsClick">
            </u-tag>
          </view>
        </view>
      </view>
    </scroll-view>



<!--    控制-->
    <view class="flex flex-row justify-between mt-5 w-11/12 mx-auto bottom-0">

      <view class="w-2/5 h-auto ">
        <u-button text="重置" size="normal" color="#F6F6F6" shape="circle" @click="clearSelect" customStyle="color:#1F2937"></u-button>
      </view>
      <view class="w-2/5 h-auto ">
        <u-button type="primary" text="确定" size="normal" color="#16a085" shape="circle" @click="confirmSelect" customStyle="color:#1F2937"></u-button>
      </view>




    </view>

  </view>


</template>

<script>

import config from "@/common/config";

export default {
  name: "filterSelect",

  props: {
    filterSelectInfo: {
      type: Object,
      default: () => {
      }
    },
    departureStationList: {
      type: Array,
      default: () => {
      }
    },
  },

  data() {
    return {
      selectBgColor:'#000',
      departCity: '北京市',

      trainTypes: [
        {
          name: '高铁(G)/动车(D)/城铁(C)',
          trainType:1,
          checked: false
        },
        {
          name: '普通车(K/T/Z/其他)',
          trainType:2,
          checked: false
        }
      ],
      departureTimes: [
        {
          name: '00:00-06:00',
          nameSeconds:'00:00:00-06:00:00',
          checked: false
        },
        {
          name: '06:00-08:00',
          nameSeconds:'06:00:00-08:00:00',
          checked: false
        },
        {
          name: '08:00-10:00',
          nameSeconds:'08:00:00-10:00:00',
          checked: false
        },
        {
          name: '10:00-12:00',
          nameSeconds:'10:00:00-12:00:00',
          checked: false
        },
        {
          name: '12:00-15:00',
          nameSeconds:'12:00:00-15:00:00',
          checked: false
        },
        {
          name: '15:00-18:00',
          nameSeconds:'15:00:00-18:00:00',
          checked: false
        },
        {
          name: '18:00-20:00',
          nameSeconds:'18:00:00-20:00:00',
          checked: false
        },
        {
          name: '20:00-22:00',
          nameSeconds:'20:00:00-22:00:00',
          checked: false
        },
        {
          name: '22:00-24:00',
          nameSeconds:'22:00:00-24:00:00',
          checked: false
        }


      ],
      arriveTimes: [
        {
          name: '00:00-06:00',
          nameSeconds:'00:00:00-06:00:00',
          checked: false
        },
        {
          name: '06:00-08:00',
          nameSeconds:'06:00:00-08:00:00',
          checked: false
        },
        {
          name: '08:00-10:00',
          nameSeconds:'08:00:00-10:00:00',
          checked: false
        },
        {
          name: '10:00-12:00',
          nameSeconds:'10:00:00-12:00:00',
          checked: false
        },
        {
          name: '12:00-15:00',
          nameSeconds:'12:00:00-15:00:00',
          checked: false
        },
        {
          name: '15:00-18:00',
          nameSeconds:'15:00:00-18:00:00',
          checked: false
        },
        {
          name: '18:00-20:00',
          nameSeconds:'18:00:00-20:00:00',
          checked: false
        },
        {
          name: '20:00-22:00',
          nameSeconds:'20:00:00-22:00:00',
          checked: false
        },
        {
          name: '22:00-24:00',
          nameSeconds:'22:00:00-24:00:00',
          checked: false
        }
      ],
      departureStations: this.departureStationList
      //     [
      //   {
      //     name: '北京站',
      //     checked: false
      //   },
      //   {
      //     name: '北京南站',
      //     checked: false
      //   },
      //   {
      //     name: '北京西站',
      //     checked: false
      //   },
      //
      // ]
    }
  },
  created() {
    this.initData()

  },
  methods: {

    initData(){
      // this.queryCityStation(this.departCity)


      if( this.filterSelectInfo.selectTrainTypes!=null) {
        for (let trainType of this.trainTypes) {
          const selectNameList = this.filterSelectInfo.selectTrainTypes.map(e => e.name)
          if (selectNameList.includes(trainType.name)) {
            trainType.checked = true
          }
        }
      }

      if(this.filterSelectInfo.selectDepartureTimes!=null){
        for(let departureTime of this.departureTimes){
          const selectNameList =  this.filterSelectInfo.selectDepartureTimes.map(e=>e.name)
          if(selectNameList.includes(departureTime.name)){
            departureTime.checked=true
          }
        }
      }

      if(this.filterSelectInfo.selectArriveTimes!=null){
        for(let arriveTime of this.arriveTimes){
          const selectNameList =  this.filterSelectInfo.selectArriveTimes.map(e=>e.name)
          if(selectNameList.includes(arriveTime.name)){
            arriveTime.checked=true
          }
        }
      }

      if( this.filterSelectInfo.selectDepartureStations!=null){
        for(let departureStation of this.departureStations){
          const selectNameList =  this.filterSelectInfo.selectDepartureStations.map(e=>e.name)
          if(selectNameList.includes(departureStation.name)){
            departureStation.checked=true
          }
        }
      }
    },
    queryCityStation(cityName){
      this.departureStations=[]
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
          for(let station of res.data){
            this.departureStations.push({name:station,checked: false})
          }
        } else {
          console.log("请求异常")
        }
      });
    },
    trainTypesClick(name) {
      this.trainTypes[name].checked = !this.trainTypes[name].checked
    },
    departureTimesClick(name) {
      this.departureTimes[name].checked = !this.departureTimes[name].checked
    },
    arriveTimesClick(name) {
      this.arriveTimes[name].checked = !this.arriveTimes[name].checked
    },
    departureStationsClick(name) {
      this.departureStations[name].checked = !this.departureStations[name].checked
    },

    clearSelect(){
      this.trainTypes.map(e=>e.checked=false)
      this.departureTimes.map(e=>e.checked=false)
      this.arriveTimes.map(e=>e.checked=false)
      this.departureStations.map(e=>e.checked=false)
    },

    confirmSelect(){

      const selectTrainTypes = this.trainTypes.filter(e => {
        return  e.checked
      });

      const selectDepartureTimes = this.departureTimes.filter(e => {
        return  e.checked
      });

      const selectArriveTimes = this.arriveTimes.filter(e => {
        return  e.checked
      });

      const selectDepartureStations = this.departureStations.filter(e => {
        return  e.checked
      });

      this.$emit('confirmFilterSelect',selectTrainTypes,selectDepartureTimes,selectArriveTimes,selectDepartureStations);
    }
  }
}
</script>

<style scoped>

</style>