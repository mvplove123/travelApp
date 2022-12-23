//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import {object} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {
			id: '',
			userName: '',
			nickName: '',
			token: '',
			birthday: '',
			sex: '',
			avatarUrl: '',
			openId: '',
			uploadKey: '',
			uploadToken: '',
			createTime:'',
			totalDays:undefined,
		},
		travelConfig: {
			homeTopImgInfoList: object,
			noticeMessageList: object,
			detailImgInfo: object,
		}
	},
	mutations: {
		loadingTravelConfig(state, config) {
			state.travelConfig.homeTopImgInfoList = config.homeTopImgInfoList
			state.travelConfig.detailImgInfo = config.detailImgInfo
			state.travelConfig.noticeMessageList = config.noticeMessageList
			uni.setStorageSync('travelConfig', state.travelConfig);
		},
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo.token = userInfo.token;
			state.userInfo.uploadKey = userInfo.uploadKey;
			state.userInfo.uploadToken = userInfo.uploadToken;
			state.userInfo.userName = userInfo.userName;
			state.userInfo.nickName = userInfo.nickName;
			state.userInfo.birthday = userInfo.birthday;
			state.userInfo.sex = userInfo.sex;
			state.userInfo.avatarUrl = userInfo.avatarUrl;
			state.userInfo.openId = userInfo.openId;
			state.userInfo.createTime=userInfo.createTime
			state.userInfo.totalDays = userInfo.totalDays

			// 保存到缓存中
			uni.setStorageSync('userInfo', state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.clearStorageSync('userInfo');
		}
	}
})

export default store
