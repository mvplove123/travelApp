<template>
	<view class="w-full h-full flex flex-col">
		<!-- 搜索 -->
		<view class="">
			<u-search v-model="addressName" placeholder="城市/拼音" @change="select" @blur="hide" :animation="false"
				:showAction="false"></u-search>
		</view>


		<view v-if="!show">


			<!-- 历史选择 -->
			<view class="text-l text-[#949494] ml-2 mt-2">定位/最近访问</view>

			<view class="flex flex-row w-11/12">
				<view class="w-2/5 m-2" v-if="!locationAddress">
					<view
						class="flex flex-row pt-1 pb-1 justify-around border-solid border border-[#DEDEDF] text-center rounded">
						<view class="text-xs -mr-2  pt-1 pb-1">
							<text class="text-xs">定位失败,点击重试</text>
						</view>
						<u-icon name="reload" color="#70A3F3" size="16"></u-icon>
					</view>
				</view>
				<view class="w-1/5 m-2" v-else>
					<view class="flex flex-row pt-1 pb-1 justify-around border-solid border border-[#DEDEDF] rounded ">
						<u-icon name="map" color="#F4D245" size="16"></u-icon>
						<text class="text-xs pt-1 pb-1">{{ locationAddress }}</text>
					</view>
				</view>
			</view>



			<!-- 热门城市 -->
			<view class="text-l text-[#949494] ml-2">热门城市</view>
			<view class="flex flex-row flex-wrap w-11/12">
				<view v-for="city in popularCities" :key="city" class="w-1/5 m-2" @click="pickCity(city)">
					<view class="w-full border-solid border border-[#DEDEDF] text-center rounded pt-1 pb-1">
						<text class="text-xs ">{{ city.name }}</text>
					</view>
				</view>
			</view>

			<!-- 城市列表 -->
			<view class="">
				<u-index-list :index-list="indexList" activeColor="#70A3F3" customNavHeight="200">
					<template v-for="(item, index) in itemArr">
						<!-- #ifdef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<u-index-item>
							<!-- 字母索引 -->
							<u-index-anchor :text="indexList[index]" bgColor="#F6F6F6"></u-index-anchor>

							<!-- 字母城市 -->
							<view class="flex flex-row flex-wrap w-11/12">
								<view class="w-1/5 m-2 	" v-for="(city, index) in item"  @click="pickCity(city)">
									<view
										class="w-full border-solid border border-[#DEDEDF] text-center rounded pt-1 pb-1">
										<text class="text-xs ">{{city.name}}</text>
									</view>

								</view>
							</view>

						</u-index-item>
					</template>
				</u-index-list>
			</view>


		</view>
		<view v-else>
			<view class=" m-4" v-for="city in queryCityList" :key="city"  @click="pickCity(city)">
				
				<text class="text-base text-[#4B5563]">{{ city.name }}</text>
					<u-line></u-line>

				
			</view>
			<u-empty mode="queryCityList" icon="http://cdn.uviewui.com/uview/empty/list.png" text="没有找到相关信息,请重试"
				v-if="queryCityList.length < 1"></u-empty>
		</view>



	</view>

</template>

<script>
	import address from './address.json'

	export default {

		data() {
			return {
				locationAddress: '北京市',
				indexList: [],
				itemArr: [],
				allCityList: [],
				queryCityList: [],
				popularCities: [{
						id: 3,
						spell: 'shanghai',
						name: '北京市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '武汉市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '杭州市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '重庆市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '南京市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '广州市'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '深圳市'
					}
				], //热门城市
				addressName: '', //显示内容
				show: false //显示搜索区域
			}
		},
		onLoad() {

			this.init()
		},
		methods: {
			init() {
				let list = address //json文件
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
				uni.showToast({
					title: `选中${e.name},模拟返回`,
					duration: 2000
				})
				// if (e.name === this.locationList[0].name) return
				// this.$store.dispatch('selectAddress/getHistoricalStorage', e)
			}
		}


	}
</script>

<style lang="scss" scoped>
</style>
