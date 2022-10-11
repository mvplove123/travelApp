<template>
	<view class="flex flex-col w-full h-auto">

		<!-- 城市说明 -->
		<view class="">

			<text class="text-lg font-sans">{{ cityName}}</text>
		</view>

		<!-- 景区列表 -->
		<view class="">

			<text></text>
		</view>

		<u-divider text="城市介绍"></u-divider>

		<!-- 城市描述 -->
		<view class="">
			<text> {{cityDesc}}</text>

		</view>

		<u-divider text="交通信息"></u-divider>

		<!-- 车次列表 -->
		<view class="" v-for="(item,index) in trafficScheduleInfoList" :key="index">

			<view class="flex flex-row mt-2 w-11/12 h-12 mt-1  justify-around bg-[#F6F7F9]  rounded">
				<view class="flex flex-col justify-around		">
					<text class="text-lg font-medium	text-[#60A5FA]	">{{item.departureTime}}</text>
					<text class="text-xs">{{item.departureStationName}}</text>
				</view>

				<view class="flex flex-col content-start items-center ">
					<text class="text-xs mt-1 text-center	">{{item.runningTime}}</text>
					<image class="w-16 h-3 -mt-0.5 -mb-0.5" src="/static/img/banner/youjiandou.png" />
					<text class="text-xs mb-1 text-center	">{{item.trainNoAlias}}</text>

				</view>

				<view class="flex flex-col justify-around ">
					<text class="text-lg font-medium		">{{item.arriveTime}}</text>
					<text class="text-xs ">{{item.arriveStationName}}</text>
				</view>

			</view>

		</view>



		<u-divider text="热门景点"></u-divider>


		<!-- 热门景点 -->


		<u-swiper :list="cityInfo.sceneryList" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
			bgColor="#ffffff"></u-swiper>

		<view class=""></view>
		<u-divider text="当地美食"></u-divider>

		<!-- 当地美食 -->
		<view class=""></view>



	</view>
</template>

<script>

	
	
	export default {
		
		
		name: "trainSchedule",
		
		
		data() {
			return {
				"cityCode": null,
				"cityName": "贵阳市",
				"cityDesc": "贵阳市是一座美丽的城市，景点多样，氛围良好，交通便利，物价低廉，是个值得去的地方",
				"sceneryList": [
					"天坛",
					"天安门",
					"故宫",
					"八达岭长城"
				],
				"trafficScheduleInfoList": [{
						"trafficNo": "2400000Z770M",
						"departureStationName": "北京西",
						"arriveStationName": "贵阳",
						"trainNoAlias": "Z77",
						"departureTime": "16:11",
						"arriveTime": "19:55",
						"runningTime": "27时43分",
						"price": null,
						"hasTicket": false,
						"arriveCityName": "贵阳市"
					},
					{
						"trafficNo": "2400000Z530Y",
						"departureStationName": "北京西",
						"arriveStationName": "贵阳",
						"trainNoAlias": "Z53",
						"departureTime": "22:32",
						"arriveTime": "02:55",
						"runningTime": "4时22分",
						"price": null,
						"hasTicket": false,
						"arriveCityName": "贵阳市"
					}
				],
				"weatherInfoList": null,
				"cityImg": "https://p1-q.mafengwo.net/s14/M00/1B/6B/wKgE2l1FV86ACVWuAAnsSy229_w653.jpg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90",
				"rate": "2"
			};
		}
	}
</script>

<style lang="scss">

</style>
