<template>
  <view class="bg-[#EFF0F5]  w-full h-screen  flex flex-col align-baseline items-center">
    <view class="">
      <u-notify message="Hi uView" :show="show"></u-notify>
    </view>
    <view class="w-11/12 h-full">

<!--      个人信息-->
      <view class="w-full h-[15vh] flex flex-row bg-white items-center ">
        <view class="w-1/3 h-auto">
          <view  class="w-auto flex items-center justify-center">
            <u-avatar :src="avatarUrl" size="80"></u-avatar>
          </view>
        </view>
        <view class="flex flex-col w-3/5 h-auto ">
          <view class="text">{{nikeName}}</view>
          <view class="text-xs mt-2">用户名:{{userName}}</view>
        </view>
        <view class="w-auto h-auto">
          <u-icon name="scan" color="#969799" size="28"></u-icon>
        </view>
        <view class="w-auto h-auto">
          <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
        </view>
      </view>
      <view class="mt-5 bg-white">
        <u-cell-group>
          <u-cell icon="star"  @click="clickBadge" title="收藏"></u-cell>
          <u-cell icon="share"  @click="clickShare" title="分享"></u-cell>
        </u-cell-group>
      </view>

      <view class="mt-2">
        <u-textarea v-model="value" placeholder="建议与反馈" count ></u-textarea>
        <u-button text="提交" type="primary" size="small"></u-button>
      </view>

      <view class="bg-white mt-2">
        <u-cell-group>
          <u-cell icon="info" @click="clickAbout" title="关于旅行"></u-cell>
        </u-cell-group>
      </view>
      <view class="bg-white">
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

export default {
  data() {
    return {
      value:'',
      show: false,
      content: '您还未登录',
      userName: 'jerry278867066',
      nikeName: '天秤座',
      avatarUrl:'https://cdn.uviewui.com/uview/album/1.jpg'
    }
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  methods: {
    ...mapMutations(['logout']),
    getUserInfo() {
      // 获取用户信息
      let userInfo = uni.getStorageSync('userInfo')
      this.userName = userInfo.name
      this.nikeName = userInfo.nike
      this.avatarUrl = userInfo.avatarUrl
    },
    exit() {
      this.logout();
      this.$refs.uTips.show({
        title: '退出成功',
        type: 'warning',
        duration: 1000,
      });
      setTimeout(function() {
        uni.redirectTo({
          url: '../login/index'
        })
      },1500);
    },
    modelConfirm() {
      uni.redirectTo({
        url: '../login/index'
      })
    },
    // 跳转至关于
    clickAbout() {
      uni.navigateTo({
        url: './about/index'
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
    }
  },
  onShow() {
    // 等待登录成功
    if(!this.hasLogin) {
      this.show = true;
    } else{
      // 关闭提示
      this.show = false;
      this.getUserInfo();
    }
  }
}
</script>

<style lang="scss">
page{
  background-color: #ededed;
}

.camera{
  width: 54px;
  height: 44px;

  &:active{
    background-color: #ededed;
  }
}
.user-box{
  background-color: #fff;
}
</style>
