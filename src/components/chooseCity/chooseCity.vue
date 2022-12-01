<template>
	<view class="flex flex-col w-full h-auto ">

		<!-- 导航栏 -->
		<view class="w-full h-12">
			<view>
				<!-- 2.0.19支持autoBack，默认为false -->
				<u-navbar :title="cityTitleName" @rightClick="rightClick" :autoBack="true" bgColor="#60A5FA"></u-navbar>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="mt-5 w-full">
			<u-search v-model="addressName" placeholder="城市/拼音" @change="select" @blur="hide" :animation="false"
				:showAction="false"></u-search>
		</view>


		<view v-if="!show">


			<!-- 历史选择 -->
			<view class="text-l text-[#949494] ml-2 mt-2">定位/最近访问</view>

			<view class="flex flex-row w-11/12">
				<view class="w-2/5 m-2" v-if="!locationAddress.name">
					<view
						class="flex flex-row pt-1 pb-1 justify-around border-solid border border-[#DEDEDF] text-center rounded">
						<view class="text-xs -mr-2  pt-1 pb-1">
							<text class="text-xs">定位失败,点击重试</text>
						</view>
						<u-icon name="reload" color="#70A3F3" size="16"></u-icon>
					</view>
				</view>
				<view class="w-1/5 m-2" v-else @click="pickCity(locationAddress)">
					<view class="flex flex-row pt-1 pb-1 justify-around border-solid border border-[#DEDEDF] rounded ">
						<u-icon name="map" color="#F4D245" size="16"></u-icon>
						<text class="text-xs pt-1 pb-1">{{ locationAddress.name }}</text>
					</view>
				</view>
			</view>



			<!-- 热门城市 -->
			<view class="text-l text-[#949494] ml-2">热门城市</view>
			<view class="flex flex-row flex-wrap w-11/12">
				<view v-for="(hotCity,index) in popularCities" :key="index" class="w-1/5 m-2" @click="pickCity(hotCity)">
					<view class="w-full border-solid border border-[#DEDEDF] text-center rounded pt-1 pb-1">
						<text class="text-xs ">{{ hotCity.name }}</text>
					</view>
				</view>
			</view>

			<!-- 城市列表 -->
			<view>
				<u-index-list :index-list="indexList" activeColor="#70A3F3">
					<view v-for="(item, index) in itemArr" :key="index" >
						<!-- #ifdef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<u-index-item>
							<!-- 字母索引 -->
							<u-index-anchor :text="indexList[index]" bgColor="#F6F6F6"></u-index-anchor>

							<!-- 字母城市 -->
							<view class="flex flex-row flex-wrap w-11/12">
								<view class="w-1/5 m-2 	" v-for="(city, index1) in item" :key="city.name" @click="pickCity(city)">
									<view
										class="w-full border-solid border border-[#DEDEDF] text-center rounded pt-1 pb-1">
										<text class="text-xs ">{{city.name}}</text>
									</view>

								</view>
							</view>

						</u-index-item>
					</view>
				</u-index-list>
			</view>


		</view>
		<view class="w-full h-auto" v-else>
			<view class=" m-4" v-for="(queryCity,index) in queryCityList" :key="index" @click="pickCity(queryCity)">

				<text class="text-base text-[#4B5563]">{{ queryCity.name }}</text>
				<u-line></u-line>


			</view>
			<u-empty mode="queryCityList" icon="http://cdn.uviewui.com/uview/empty/list.png" text="没有找到相关信息,请重试"
				v-if="queryCityList.length < 1"></u-empty>
		</view>

<!--    调用组件-->
    <cityLocation @loadAddress="getLocation()"></cityLocation>


  </view>

</template>

<script>
	import address from './address.js'
  import cityLocation from "@/components/cityLocation/cityLocation";
	export default {
    components: {
      cityLocation
    },
		name: "chooseCity",

		props: {
			cityTitleName: {
				type: String,
				default: ''
			},
			posterInfo: {
				type: Object,
				default: () => {}
			},
			value: {}
		},

		data() {
			return {
			
				locationAddress: {
          id: '',
          spell: '',
          name: ''
        },

				indexList: [],
				itemArr: [],
				allCityList: [],
				queryCityList: [],
				popularCities: [
					{
						id: 0,
						spell: '不限',
						name: '不限'
					},
					{
						id: 1,
						spell: 'beijingshi',
						name: '北京市'
					},
					{
						id: 2,
						spell: 'shanghai',
						name: '上海市'
					},
					{
						id: 3,
						spell: 'wuhanshi',
						name: '武汉市'
					},
					{
						id: 4,
						spell: 'hangzhoushi',
						name: '杭州市'
					},
					{
						id: 5,
						spell: 'chongqingshi',
						name: '重庆市'
					},
					{
						id: 6,
						spell: 'nanjingshi',
						name: '南京市'
					},
					{
						id: 7,
						spell: 'guangzhoushi',
						name: '广州市'
					},
					{
						id: 8,
						spell: 'shenzhenshi',
						name: '深圳市'
					}
				], //热门城市
				addressName: '', //显示内容
				show: false //显示搜索区域
			}
		},
		onLoad() {

			this.initData()
		},
		mounted() {
			this.initData()
		},

    methods: {
      // 页面加载就会触发
      getLocation(address){
        // address就是组件传出的具体位置
        this.locationAddress.name = address
        console.info("locationAddress", this.locationAddress)
      },
			initData() {
				let list = address
				let cityIndex = []
				let cityItemArr = []


				for (const key in address) {
					this.indexList.push(address[key].letter)
					this.itemArr.push(address[key].citylist)
					this.allCityList.push(...address[key].citylist)
				}
			},
			select(keyWord) {
				uni.$u.debounce(() => {
					if (keyWord === '') {
						this.show = false
						this.queryCityList = [] //清空搜索结果
						return
					}
					this.show = true //判断是否展示搜索结果页面
					this.queryCityList = this.allCityList.filter(city => this.query(keyWord, city)) //搜索结果数组
				}, 100)
			},
			query(keyWord, city) {
				return (
					city.name.indexOf(keyWord) !== -1
				)
			},

			pickCity(e) {
				this.$emit('pickedCity',e)

				
				// if (e.name === this.locationList[0].name) return
				// this.$store.dispatch('selectAddress/getHistoricalStorage', e)
			}
		}


	}
</script>

<style lang="scss" scoped>
</style>
