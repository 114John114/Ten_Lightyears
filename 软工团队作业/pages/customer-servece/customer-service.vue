<template>
  <view class="customer-service">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-icon" @click="goBack">
        <text class="back-text">＜</text>
      </view>
      <text class="title">智能客服中心</text>
    </view>

    <!-- 推荐服务区域 -->
    <view class="service-section">
      <text class="section-title">推荐服务</text>
      <view class="service-grid">
        <view class="service-row">
          <view class="service-item" v-for="(item, index) in recommendServices.slice(0, 3)" :key="index" @click="handleServiceClick(item)">
            <image :src="item.icon" mode="widthFix"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
        <view class="service-row">
          <view class="service-item" v-for="(item, index) in recommendServices.slice(3, 6)" :key="index + 3" @click="handleServiceClick(item)">
            <image :src="item.icon" mode="widthFix"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 热门资讯区域 -->
    <view class="service-section">
      <text class="section-title">热门资讯</text>
      <view class="service-grid">
        <view class="service-row">
          <view class="service-item" v-for="(item, index) in hotServices.slice(0, 3)" :key="index" @click="handleServiceClick(item)">
            <image :src="item.icon" mode="widthFix"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
        <view class="service-row" v-if="hotServices.length > 3">
          <view class="service-item" v-for="(item, index) in hotServices.slice(3)" :key="index + 3" @click="handleServiceClick(item)">
            <image :src="item.icon" mode="widthFix"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <view class="btn" @click="toCustomerService">
        <image src="/static/icons/customer-service.png" mode="widthFix"></image>
        <text>客服服务</text>
      </view>
      <view class="btn" @click="toPhoneConsult">
        <image src="/static/icons/phone.png" mode="widthFix"></image>
        <text>电话咨询</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recommendServices: [
        { name: '航班助手', icon: '/static/icons/flight.png', path: '/pages/flight/flight' },
        { name: '停运查询', icon: '/static/icons/suspension.png', path: '/pages/suspension/index' },
        { name: '机票报销', icon: '/static/icons/reimburse.png', path: '/pages/reimburse/index' },
        { name: '出行清单', icon: '/static/icons/checklist.png', path: '/pages/checklist/index' },
        { name: '权益兑换', icon: '/static/icons/benefits.png', path: '/pages/benefits/index' },
        { name: '紧急救援', icon: '/static/icons/emergency.png', path: '/pages/emergency/index' }
      ],
      hotServices: [
        { name: '国内机票', icon: '/static/icons/domestic-flight.png', path: '/pages/domestic-flight/index' },
        { name: '国内酒店', icon: '/static/icons/hotel.png', path: '/pages/hotel/index' },
        { name: '民宿', icon: '/static/icons/homestay.png', path: '/pages/homestay/index' },
        { name: '会员中心', icon: '/static/icons/member.png', path: '/pages/member/index' }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    handleServiceClick(item) {
      uni.navigateTo({
        url: item.path
      })
    },
    toCustomerService() {
      uni.navigateTo({
        url: '/pages/feedback/feedback'
      })
    },
    toPhoneConsult() {
      // 可以直接拨打电话或跳转到电话咨询页面
      uni.makePhoneCall({
        phoneNumber: '400-XXX-XXXX'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-service {
  min-height: 100vh;
  background-color: #f5f5f5;
  
  .header {
    background-color: #1890ff;
    padding: 40rpx 20rpx;
    display: flex;
    align-items: center;
    color: #fff;
    
    .back-icon {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      margin-right: 20rpx;
      
      .back-text {
        font-size: 40rpx;
        font-weight: bold;
        color: #fff;
      }
    }
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
    }
  }

  .service-section {
    background-color: #fff;
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 12rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
      padding-left: 20rpx;
      border-left: 8rpx solid #1890ff;
    }
    
    .service-grid {
      .service-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rpx;
        
        &:last-child {
          margin-bottom: 0;
        }

        .service-item {
          flex: 1;
          margin: 0 10rpx;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
      
      .service-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20rpx;
        
        image {
          width: 100rpx;
          height: 100rpx;
          margin-bottom: 16rpx;
        }
        
        text {
          font-size: 26rpx;
          color: #333;
          text-align: center;
        }

        &:active {
          opacity: 0.7;
        }
      }
    }
  }

  .bottom-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    padding: 20rpx;
    border-top: 1rpx solid #eee;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      image {
        width: 56rpx;
        height: 56rpx;
        margin-bottom: 10rpx;
      }
      
      text {
        font-size: 26rpx;
        color: #333;
      }

      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
