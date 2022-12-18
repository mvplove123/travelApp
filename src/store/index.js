//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
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
			openId: ''
		}
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo.token = userInfo.token;
			state.userInfo.userName = userInfo.userName;
			state.userInfo.nickName = userInfo.nickName;
			state.userInfo.birthday = userInfo.birthday;
			state.userInfo.sex = userInfo.sex;
			state.userInfo.avatarUrl = userInfo.avatarUrl;
			state.userInfo.openId = userInfo.openId;
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
