<template>
  <view class="bg-[#EFF0F5]  w-full h-screen  flex flex-col align-baseline items-center" :style="{ backgroundImage: `url(${backgroundImage})`,backgroundSize:'100% 400rpx',backgroundRepeat:'no-repeat'}">

    <u-sticky offset-top="200">

      <u-navbar title="个人中心" titleStyle="font-weight:bold" :autoBack="false" bgColor="transparent" :titleStyle="{color:'#fff'}">
      </u-navbar>
    </u-sticky>

    <view class="w-11/12 h-full">

<!--      个人信息-->
      <view class="mt-10 w-full h-[25vh] flex flex-row bg-transparent items-center rounded"  >

        <view class="w-1/4 h-auto">
          <view  class="w-auto flex items-center justify-center">
            <u-avatar :src="userInfo.avatarUrl" size="60"></u-avatar>
          </view>
        </view>
        <view class="flex flex-col w-1/2 h-auto ">
          <view class="text-lg text-white" @click="wxlogin">{{userInfo.nickName}}</view>
<!--          <view class="text-sm text-white">{{userInfo.userName}}</view>-->
          <view class=" text-xs font-bold text-[#D1D5DB]">虎豆旅行已经陪伴你{{userInfo.totalDays}}天了</view>

        </view>
        <view class="w-2/5 h-auto flex justify-around" @click="setUserInfo">
          <view class=" text-xs text-[#F87171] font-bold	">设置头像昵称</view>
          <u-icon name="arrow-right" color="#969799" size="14"></u-icon>
        </view>
      </view>
      <view class="mt-5 bg-white">
        <u-cell-group>
          <u-cell icon="star"  @click="clickBadge" title="收藏"></u-cell>
          <u-cell icon="share"  @click="clickShare" title="分享"></u-cell>
        </u-cell-group>
      </view>

      <view class="mt-2">
        <u-textarea v-model="feedback" placeholder="建议与反馈" count confirmType="done"></u-textarea>
        <u-button text="提交" type="primary" size="small" color="linear-gradient(to right, #16a085, #f4d03f)" @click="submitFeedback"></u-button>
      </view>

      <view class="bg-white mt-2">
        <u-cell-group>
          <u-cell icon="info" @click="clickAbout" title="关于虎豆旅行"></u-cell>
        </u-cell-group>
      </view>
      <view class="bg-white" v-if="hasLogin">
        <u-cell-group>
          <u-cell icon="close" title="退出" @click="exit">
          </u-cell>
        </u-cell-group>
      </view>
    </view>
    <u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="true" :content="content"></u-modal>
    <u-toast ref="uToast" />

  </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import dayjs from "dayjs";
import config from "@/common/config";

export default {
  data() {
    return {
      backgroundImage:'https://p1-q.mafengwo.net/s8/M00/E9/5E/wKgBpVYaIiiAaLplAAlJrUawqC426.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
      show: false,
      userInfo:{
        userName: undefined,
        nickName: '未登录',
        avatarUrl: undefined,
        totalDays: 0,
        openId: '',
      },
      feedback:'',
      content: '您还未登录',
    }
  },
  onShow() {
    this.getUserInfo()
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  methods: {
    ...mapMutations(['logout']),

    setUserInfo(){
      if(this.hasLogin){
        this.$u.route('/pages/accountInfo/accountInfo')
      }else{
        this.$refs.uToast.show({
          message: '登录后才能设置哦',
          type: 'error'
        });
      }
    },

    getUserInfo() {
      // 获取用户信息
      let userInfo = uni.getStorageSync('userInfo')
      this.userInfo.userName = userInfo.userName
      if(userInfo.nickName){
        this.userInfo.nickName = userInfo.nickName
      }
      this.userInfo.avatarUrl = userInfo.avatarUrl
      if(userInfo.totalDays){
        this.userInfo.totalDays = userInfo.totalDays
      }
      this.userInfo.openId = userInfo.openId
    },
    exit() {

      this.logout();
      this.userInfo={}
      this.userInfo.nickName='未登录'
      this.userInfo.totalDays=0
      this.$refs.uToast.show({
        message: '退出成功',
        type: 'success',
        duration: 1000,
      });
    },
    modelConfirm() {
      uni.redirectTo({
        url: '../homePage/homePage'

      })
    },
    // 跳转至关于
    clickAbout() {
      uni.navigateTo({
        url: '../about/about'
      });
    },
    // 点击徽章
    clickBadge() {
      this.$refs.uToast.show({
        message: '收藏功能即将上线'
      });
    },
    // 点击分享
    clickShare() {
      this.$refs.uToast.show({
        message: '分享功能即将上线'
      });
    },

    // 提交用户反馈
    async submitFeedback() {
      if(!this.hasLogin){
        this.$refs.uToast.show({
          message: '登录后才能提交反馈',
          type: 'error'
        });
        return
      }

      let params = {
        userName: this.userInfo.userName,
        nickName: this.userInfo.nickName,
        origin: 4,
        content:this.feedback,
      }
      await this.$http.httpPost(config.addFeedBack,
          params
      ).then(res => {

        if (res.success == true) {
          this.feedback = ''
          this.$refs.uToast.show({
            message: '提交成功',
            type: 'success',
            duration: 1000,
          });
        } else {
          this.$refs.uToast.show({
            message: '提交失败',
            type: 'error'
          });
        }
      })
    },
  }

}
</script>

<style lang="scss">

</style>
