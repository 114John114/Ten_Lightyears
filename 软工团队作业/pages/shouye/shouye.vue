<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="avatar">
        <image src="/static/me.png" mode="aspectFit"></image>
      </view>
      <view class="search-box">
        <input type="text" placeholder="输入城市" />
        <image src="/static/search.png" mode="aspectFit" class="search-icon"></image>
      </view>
      <view class="header-icons">
        <image 
          src="/static/headset-one.png" 
          mode="aspectFit" 
          @click="toCustomerService"
        ></image>
        <image src="/static/message-one.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 主要功能按钮 -->
    <view class="main-buttons">
      <view class="button-item" @click="navigateTo('/pages/custom-route/custom-route')">
        <image src="/static/navigation.png" mode="aspectFit"></image>
        <view class="button-text">
          <text class="cn-text">制定路线</text>
          <text class="en-text">Develop a route</text>
        </view>
      </view>

      <view class="button-item" @click="navigateTo('/pages/my-trips/my-trips')">
        <image src="/static/map-draw.png" mode="aspectFit"></image>
        <view class="button-text">
          <text class="cn-text">我的行程</text>
          <text class="en-text">My Route</text>
        </view>
      </view>

      <view class="button-item weather" @click="navigateTo('/pages/weather/weather')">
        <image src="/static/sun.png" mode="aspectFit"></image>
        <view class="button-text">
          <text class="cn-text">天气预报</text>
        </view>
      </view>
    </view>

    <!-- 热门城市 -->
    <view class="hot-cities">
      <view class="section-title">热门城市</view>
      <view class="city-list">
        <view class="city-item">
          <text class="city-name">上海</text>
          <text class="city-stats">5千人想去</text>
          <text class="city-stats">3万次搜索</text>
        </view>
        <view class="city-item">
          <text class="city-name">北京</text>
          <text class="city-stats">4千人想去</text>
          <text class="city-stats">2万次搜索</text>
        </view>
        <view class="city-item">
          <text class="city-name">广州</text>
          <text class="city-stats">3千人想去</text>
          <text class="city-stats">2万次搜索</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const navigateTo = (url: string) => {
      uni.navigateTo({
        url: url
      })
    }

    const toCustomerService = () => {
      uni.navigateTo({
        url: '/pages/customer-servece/customer-service'
      })
    }

    return {
      navigateTo,
      toCustomerService
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar image {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.search-box {
  flex: 1;
  margin: 0 15px;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 15px;
}

.search-box input {
  padding-right: 30px;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.header-icons {
  display: flex;
  gap: 15px;
}

.header-icons image {
  width: 24px;
  height: 24px;
}

.main-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.button-item {
  flex: 1;
  min-width: 45%;
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.button-item.weather {
  width: 100%;
}

.button-item image {
  width: 30px;
  height: 30px;
}

.button-text {
  display: flex;
  flex-direction: column;
}

.cn-text {
  font-size: 16px;
  font-weight: bold;
}

.en-text {
  font-size: 12px;
  color: #666;
}

.hot-cities {
  margin-top: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.city-name {
  font-size: 16px;
  font-weight: bold;
}

.city-stats {
  color: #666;
  font-size: 14px;
}
</style> 