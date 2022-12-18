<template>
  <view class="bg-white  w-full h-screen flex flex-col items-center">

    <view class="w-11/12 h-full flex flex-col">

      <!--头像-->
      <view class="flex w-full h-1/5 items-center justify-center">
        <button class="bg-transparent after:border-0" hover-class="none"
                open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <view class="w-auto flex items-center justify-center">
            <u-avatar :src="userInfo.avatarUrl" size="80"></u-avatar>
          </view>
          <view class="mt-[15rpx] text-center text-muted text-xs text-[#202023]"> 点击修改头像</view>
        </button>
      </view>
      <u-line></u-line>


      <view class="item text-nr flex justify-between" @click="changeUserName">
        <view class="label">账号</view>
        <view class="content">{{ userInfo.userName }}</view>
        <u-icon name="arrow-right" size="14" color="#666"></u-icon>
      </view>
      <u-line></u-line>


      <view class="item text-nr flex justify-between" @click="changeNickName">
        <view class="label">昵称</view>
        <view class="content">{{ userInfo.nickName }}</view>
        <u-icon name="arrow-right" size="14" color="#666"></u-icon>
      </view>
      <u-line></u-line>

      <!-- 性别 -->
      <view class="item text-nr flex justify-between" @click="changeSex">
        <view class="label">性别</view>
        <view class="content">{{ userInfo.sex }}</view>
        <u-icon name="arrow-right" size="14" color="#666"></u-icon>
      </view>

      <u-line></u-line>

      <!-- 出生日期 -->
      <view class="item text-nr flex justify-between" @click="changeBirthday">
        <view class="label">生日</view>
        <view class="content">{{ userInfo.birthday }}</view>
        <u-icon name="arrow-right" size="14" color="#666"></u-icon>
      </view>
      <u-line></u-line>

      <view class="item text-nr flex justify-between">
        <view class="label">注册时间</view>
        <view class="content">{{ userInfo.createTime }}</view>
      </view>

      <view class="mt-10">
        <u-button type="primary" text="保存" shape="circle" @click="wxUserSave"  color="linear-gradient(to right, #16a085, #f4d03f)" ></u-button>
      </view>


    </view>


    <!-- 账号修改组件 -->
    <u-popup :show="showUserName" mode="center" :closeable="true" round="10" @close="closeUserName">
      <view class="w-[90vw] h-[25vh] flex mt-4 justify-center">
        <view class="w-11/12 h-auto">
          <view class=" text-base text-center text-[#2B2B2B]">修改账号</view>
          <view  class="mt-10">
            <u--form :model="form" ref="uForm">
              <u-form-item prop="name" borderBottom>
                <u-input v-model="form.userName" placeholder="请输入账号" clearable border="none"></u-input>
              </u-form-item>
            </u--form>
          </view>
          <view class=" mt-10">
          <u-button type="primary" text="确定" formType="submit" @click="changeUserNameConfirm" shape="circle"></u-button>
        </view>
        </view>
      </view>
    </u-popup>

    <!-- 昵称修改组件 -->
    <u-popup :show="showNickName" mode="center" :closeable="true" round="10" @close="closeNickName">
      <view class="w-[90vw] h-[25vh] flex mt-4 justify-center">
        <view class="w-11/12 h-auto">
          <view class=" text-base text-center text-[#2B2B2B]">修改昵称</view>
          <view class="mt-10">
            <u--form :model="form" ref="uForm" class="mt-8">
              <u-form-item prop="name" borderBottom>
                <u-input type="nickname" v-model="form.nickName" placeholder="请输入昵称" clearable border="none"></u-input>
              </u-form-item>
            </u--form>
          </view>
          <view class="mt-10">
          <u-button type="primary" text="确定" formType="submit" @click="changeNickNameConfirm" shape="circle"></u-button>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 性别修改组件 -->
    <u-picker :show="showPicker" ref="uPicker" :columns="sexList" @confirm="changeSexConfirm" @cancel="showPicker=false" title="选择性别"></u-picker>

    <!-- 出生日期组件 -->
    <u-datetime-picker :show="showBirthdayPicker" v-model="currentDate" mode="date" :minDate="7200000" title="出生日期"
                       :formatter="formatter"
                       @confirm="changeBirthdayConfirm" @cancel="showBirthdayPicker=false"></u-datetime-picker>

    <u-toast ref="uToast" />

  </view>
</template>

<script>
import config from "@/common/config";
import dayjs from "dayjs";
import {mapState, mapMutations} from 'vuex';


export default {
  data() {
    return {
      userInfo:{
        userName: undefined,
        nickName: undefined,
        avatarUrl: undefined,
        sex: '',
        birthday: '',
        openId: '',
        createTime:undefined,
      },
      showUserName: false,
      showNickName: false,
      showPicker: false,
      showBirthdayPicker: false,
      sexList: [
        ['男', '女'],
      ],
      currentDate: Number(new Date()),
      form: {
        userName:'',
        nickName: '',
      },
    }
  },

  onShow() {
    // 等待登录成功
      this.getUserInfo();
  },
  computed: {
    ...mapState(['hasLogin'])
  },
  methods: {

    ...mapMutations(['login']),


    onChooseAvatar(e) {
      this.userInfo.avatarUrl = e.detail.avatarUrl
    },

// 修改用户账号
    changeUserNameConfirm() {
      let userName = this.form.userName
      if (userName== '') return uni.$u.toast('账号不能为空')
      //账号只能是数字和字母下划线
      if (!/^[a-zA-Z0-9_]{1,}$/.test(userName)) return uni.$u.toast('账号只能是数字、字母、下划线')
      if (userName.length > 10) return uni.$u.toast('昵称长度不得超过十位数')
      this.userInfo.userName = userName
      this.showUserName = false
    },

    closeUserName() {
      this.showUserName = false
    },


// 修改用户昵称
    changeNickNameConfirm() {
      let nickName = this.form.nickName
      if (nickName == '') return uni.$u.toast('昵称不能为空')
      if (nickName.length > 10) return uni.$u.toast('昵称长度不得超过十位数')
      this.userInfo.nickName = nickName
      this.showNickName = false
    },

    closeNickName() {
      this.showNickName = false
    },

    changeSexConfirm(e) {
      this.userInfo.sex = e.value[0]
      this.showPicker = false
    },

    changeBirthdayConfirm(e) {
      this.userInfo.birthday = dayjs(e.value).format('YYYY-MM-DD');
      this.showBirthdayPicker = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      return value
    },


    changeUserName() {
      this.showUserName = true
    },
    changeNickName() {
      this.showNickName = true
    },
    changeSex() {
      this.showPicker = true
    },
    changeBirthday() {
      this.showBirthdayPicker = true
    },

    getUserInfo() {
      // 获取用户信息
      let userInfo = uni.getStorageSync('userInfo')
      this.userInfo.userName = userInfo.userName
      this.form.userName = userInfo.userName
      this.form.nickName = userInfo.nickName
      this.userInfo.nickName = userInfo.nickName
      this.userInfo.avatarUrl = userInfo.avatarUrl
      this.userInfo.sex = userInfo.sex
      this.userInfo.birthday = userInfo.birthday
      this.userInfo.openId = userInfo.openId
      this.userInfo.createTime = userInfo.createTime
    },


    // 发起保存
    async wxUserSave() {
      var params = {
        openId: this.userInfo.openId,
        userName: this.userInfo.userName,
        nickName: this.userInfo.nickName,
        birthday: this.userInfo.birthday,
        sex:this.userInfo.sex,
        avatarUrl: this.userInfo.avatarUrl
      }
      await this.$http.httpPost(config.wxUserSave,
          params
      ).then(res => {

        if (res.success == true) {
          this.login(this.userInfo);
          this.$isResolve();
          this.$refs.uToast.show({
            message: '更新成功',
            type: 'success',
            duration: 1000,
          });
        } else {
          this.$refs.uToast.show({
            message: '更新失败',
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss">

.item {
  margin-top: 2rpx;
  padding: 30rpx;
  background-color: #ffffff;

  .label {
    width: 150rpx;
  }

  .content {
    flex: 1;
    width: 80%;
  }
}
</style>