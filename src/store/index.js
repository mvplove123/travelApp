//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import {object} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";
import dayjs from "dayjs";
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
			totalDays:'',
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
			if(userInfo.uploadKey){
				state.userInfo.uploadKey = userInfo.uploadKey;
			}
			if (userInfo.uploadToken){
				state.userInfo.uploadToken = userInfo.uploadToken;
			}
			if(userInfo.userName){
				state.userInfo.userName = userInfo.userName;
			}
			if (userInfo.nickName) {
				state.userInfo.nickName = userInfo.nickName;
			}
			if(userInfo.birthday){
				state.userInfo.birthday = userInfo.birthday;
			}
			if(userInfo.sex){
				state.userInfo.sex = userInfo.sex;
			}
			if(userInfo.avatarUrl){
				state.userInfo.avatarUrl = userInfo.avatarUrl+"?key="+dayjs().format("YYYYMMDDHHmmss");
			}
			state.userInfo.openId = userInfo.openId;
			if(userInfo.createTime){
				state.userInfo.createTime=userInfo.createTime
			}
			if(userInfo.totalDays!= null){
				state.userInfo.totalDays = userInfo.totalDays
			}
			// 保存到缓存中
			uni.setStorageSync('userInfo', state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorageSync('userInfo');
		}
	}
})

export default store
