<template>
	<view class=" bg-[#F2F2F2]  w-full h-auto  flex-col align-baseline">

		<!-- 滚动图 -->
		<view class=" w-full h-30 bg-[#34D399] ">

			<u-swiper :list="list3" indicator indicatorMode="dot" circular radius="0" height="400rpx">
			</u-swiper>

		</view>

		<!-- 通知栏 -->
		<view class="bg-blue-100  ">
			<u-notice-bar :text="text1" mode="link"></u-notice-bar>
		</view>


		<!-- 查询栏 u-m-t-30 u-border-radius-big-->
		<view class="h-auto w-11/12 bg-white rounded-lg m-auto mt-2 shadow-l">

			<u-form class="">

				<!-- 第一行 -->
				<view class="flex flex-row justify-between items-center h-20">
					<view class="flex flex-col ml-4" @click="openShowCityList('出发城市选择')">
						<text class="text-[#C1C1C1] text-xs	">出发城市</text>
						<text class="text-2xl mt-1 font-medium">{{departCity}}</text>



						<u-popup :show="chooseCityFlag" @close="closeShowCityList"
							@open="openShowCityList(cityTitleName)" mode='right'>

              <scroll-view :scroll-top="0" scroll-y="true" class=" bg-[#EFF0F5] w-screen h-screen  rounded-md mt-8" >

                <!--      <view class="bg-[#EFF0F5] w-full h-[70vh] overflow-y-auto rounded-md	">-->

                <!--             弹窗内容信息-->

                <chooseCity :cityTitleName="cityTitleName" @pickedCity="change"></chooseCity>

              </scroll-view>
<!--              -->
<!--							<view class="">-->
<!--							</view>-->
						</u-popup>



					</view>
					<view class=" mt-5 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
						<!-- 图片 -->
						<image class="w-5 h-5" src="/static/img/banner/departure.png" />
					</view>
					<view class="flex flex-col mr-4 " @click="openShowCityList('到达城市选择')">
						<text class="text-[#C1C1C1] text-xs	">到达城市</text>
						<text class="text-2xl mt-1 font-semibold">{{targetCity}}</text>
					</view>
				</view>
				<u-divider style="margin: 0rpx;" lineColor="#dcdfe6"></u-divider>

				<!-- 出行日期 -->
				<view class=" flex  items-center h-20">
					<view class="flex flex-col ml-4 w-full" @click="showCalendar = true">
						<view>
							<text class="text-[#C1C1C1] text-xs	">出行日期</text>

						</view>
						<view>
							<text class="text-2xl mt-1 font-semibold">{{departDateStr}}</text>
							<text class="text-l ml-1 font-semibold">{{dateNumStr}}</text>
							<text class="text-l ml-1 font-semibold">{{week}}</text>
						</view>

						<u-calendar :show="showCalendar" :mode="mode" @confirm="confirm" @close="calendarClose"
							title="选择出行日期">
						</u-calendar>
					</view>
				</view>
				<u-divider style="margin: 0rpx;" lineColor="#dcdfe6"></u-divider>


				<!-- 复选框 -->
				<view class="flex flex-row m-4 h-5 ">
					<u-checkbox-group placement="row" iconPlacement="left" v-model="transportType">
						<u-checkbox v-for="(item, index) in checkboxList" :key="index" :label="item.name"
							:name="item.type" activeColor="#70A3F3" labelColor="#C1C1C1">
						</u-checkbox>
					</u-checkbox-group>
				</view>

				<view class="flex flex-row h-30">
					<u-button size="large" class="ml-4 mr-4 mb-4" color="#60A5FA" @click="jump">
						<text class="text-l mt-1 font-semibold">查询</text>
					</u-button>
				</view>

			</u-form>

		</view>

		<!-- 当前目的地可去城市列表，只列第二天热门数据 -->
		<view class="h-60 w-11/12 bg-white rounded-lg ml-auto mr-auto mt-2">

			<text>目的地</text>

		</view>


	</view>
</template>

<script>
	import chooseCity from '@/components/chooseCity/chooseCity.vue'

	import dayjs from 'dayjs'

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
				console.log(data),
					console.log("已经选择", data)

				if (this.departCityChooseFlag) {
					this.departCity = data.name
					this.departCityChooseFlag = false
				}

				if (this.targetCityChooseFlag) {
					this.targetCity = data.name
					this.targetCityChooseFlag = false
				}
				this.closeShowCityList()
			},

			calendarClose(e) {
				this.showCalendar = false
			},

			submit() {
				console.log("选择" + this.departDate + this.transportType);

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
			}
		},
	};
</script>

<style lang="scss" scoped>

</style>
