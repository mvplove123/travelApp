

<template>
<ui-page fixedBodyHeight titleColor="#000">
	<view slot="header" class="header">
		<u-search v-model="addressName" placeholder="城市/拼音" @change="select" @blur="hide" :animation="false"
			:showAction="false"></u-search>
	</view>
	<view style="background:#f5f5f5" v-if="!show">
		<ui-index-list :indexList="indexList" :customNavHeight="getTabbarHeight">
			<view class="title">定位/最近访问</view>
			<view class="popularcities">
				<view class="city" style="width:400rpx;color:#2979ff" v-if="!locationAddress">
					<view class="cityitem">
						<view class="u-line-1" style="margin-right:5rpx">
							定位失败,点击重试
						</view>
						<u-icon name="reload" color="#2979ff" size="16"></u-icon>
					</view>
				</view>
				<view class="city" v-else>
					<view class="cityitem" @click="selectAddress(locationAddress)">
						<u-icon name="map" color="#2979ff" size="16"></u-icon>
						<view class="u-line-1" style="margin-left:5rpx">
							{{ locationAddress.name }}
						</view>
					</view>
				</view>
				<view class="city" v-for="(city, index) in locationList" :key="index" @click="selectAddress(city)">
					<view class="cityitem">
						<view class="u-line-1">{{ city.name }}</view>
					</view>
				</view>
			</view>
			<view class="title">热门城市</view>
			<view class="popularcities">
				<view v-for="city in popularCities" :key="city" class="city u-line-1" @click="selectAddress(city)">
					{{ city.name }}
				</view>
			</view>
			<view v-for="(item, index) in itemArr" :key="index">
				<u-index-item>
					<view class="tabindex">{{ indexList[index] }}</view>
					<view class="list-cell" v-for="cell in item" :key="cell.id" @click="selectAddress(cell)">
						{{ cell.name }}
					</view>
				</u-index-item>
			</view>
		</ui-index-list>
	</view>
	<view v-else>
		<view class="list-cell" v-for="cell in selectList" :key="cell.id" @click="selectAddress(cell)">
			{{ cell.name }}
		</view>
		<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="没有找到相关信息,请重试"
			v-if="selectList.length < 1"></u-empty>
	</view>
</ui-page>
</template>

<script>
	import address from './address.json'
	// import { getNavbarHeight } from '@/libs/utils/sys'
	export default {
		data() {
			return {
				indexList: [], //索引
				itemArr: [], //城市合集
				list: [], //把二维数组变一维为数组
				selectList: [], //搜索结果
				popularCities: [{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					},
					{
						id: 3,
						spell: 'shanghai',
						name: '上海'
					}
				], //热门城市
				addressName: '', //显示内容
				show: false //显示搜索区域
			}
		},
		onLoad() {
			this.init()
			// this.$store.dispatch('selectAddress/getHistoricalStorage')
		},
		methods: {
			select(e) {
				uni.$u.debounce(() => {
					if (e === '') {
						this.show = false
						this.selectList = [] //清空搜索结果
						return
					}
					this.show = true //判断是否展示搜索结果页面
					let len = e.length
					this.selectList = this.list.filter(v => this.query(e, v, len)) //搜索结果数组
				}, 100)
			},
			query(e, v, len) {
				return (
					v.spell.substring(0, len).indexOf(e) !== -1 ||
					v.name.substring(0, len).indexOf(e) !== -1
				)
			},
			hide() {
				if (this.addressName === '') {
					this.show = false
				}
			},
			init() {
				let list = address //json文件
				let cityIndex = []
				let cityItemArr = []

		// 		for (const key in address) {

		// 			cityIndex.push(address[key].letter)


		// 			let cityNameList = address[key].citylist.map((item, index) => {
		// 				return item.name;
		// 			});

		// 			cityItemArr.push(cityNameList)
		

		// 			this.list = [...cityIndex, ...cityItemArr]
		// 		}

				this.indexList=cityIndex
				this.itemArr = cityItemArr
			console.log("打印的属性",this.list)


			},
			cliceIndexs(e) {
				console.log(e)
			},

			selectAddress(e) {
				uni.showToast({
					title: `选中${e.name},模拟返回`,
					duration: 2000
				})
				if (e.name === this.locationList[0].name) return
				this.$store.dispatch('selectAddress/getHistoricalStorage', e)
			}
		},
		computed: {
			getTabbarHeight() {
				return "180px";
			},
			// locationList() {
			// 	let data = []
			// 	if (this.locationAddress) {
			// 		return data.splice(0, 2)
			// 	} else {
			// 		return data.splice(0, 1)
			// 	}
			// },
			// locationAddress() {
			// 	return this.$store.state.selectAddress.locationAddress
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		position: relative;
	}

	.list-cell::after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 24rpx;
		height: 3rpx;
		background: #f1f1f1;
	}

	.anchor {
		padding: 24rpx;
		color: rgb(112, 112, 112);
		font-size: 24rpx;
	}

	.header {
		/*  #ifndef H5  */
		margin: 0 30vw 0 9vw !important;
		max-width: 50vw;
		/* #endif */
	}

	.tabindex {
		padding: 30rpx;
		color: rgb(71, 71, 71);
		font-size: 28rpx;
		background: #f2f2f2;
	}

	.title {
		font-size: 32rpx;
		color: #ccc;
		padding: 15rpx 30rpx;
	}

	.popularcities {
		margin: 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.cityitem {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.city {
			margin: 0 30rpx 30rpx 0;
			padding: 0 5rpx;
			width: 190rpx;
			text-align: center;
			line-height: 70rpx;
			height: 70rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			border: 1rpx solid rgb(236, 236, 236);
			box-shadow: 5rpx 5rpx 5rpx #f9f9f9;
			background: #fff;
		}
	}
</style>
