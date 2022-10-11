import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
// @ts-ignore

import uView from "uview-ui";
// @ts-ignore

import {router,RouterMount} from './router'  //路径换成自己的
// @ts-ignore
import * as http from '@/common/http' // http请求接口
// @ts-ignore

import * as utils from '@/common/utils' // 工具文件
// @ts-ignore

import * as config from '@/common/config.js'
// @ts-ignore

import store from './store';


// 定义全局
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$config = config

Vue.use(router)
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store	// 挂载在Vue实例上

// @ts-ignore
App.mpType = 'app'
const app = new Vue({
    ...App
})




//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
new Vue({render:h=>h(App)}).$mount();
// RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// #endif

// #ifdef VUE3
// @ts-ignore
import { createSSRApp } from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif