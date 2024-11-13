<template>
  <view class="container">
    <!-- 推荐景点列表 -->
    <view class="section">
      <view class="section-title">推荐景点</view>
      <view class="spot-list">
        <!-- 鼓山 -->
        <view class="spot-card">
          <image class="spot-image" src="/static/logo.png" mode="aspectFill"></image>
          <view class="spot-info">
            <view class="spot-name">鼓山</view>
            <view class="spot-rating">5星</view>
            <view class="spot-tags">
              <text class="tag">历史遗产</text>
              <text class="tag">艺术展览</text>
              <text class="tag">教育体验</text>
              <text class="tag">地方特色</text>
            </view>
          </view>
        </view>

        <!-- 三坊七巷 -->
        <view class="spot-card">
          <image class="spot-image" src="/static/logo.png" mode="aspectFill"></image>
          <view class="spot-info">
            <view class="spot-name">三坊七巷</view>
            <view class="spot-rating">5星</view>
            <view class="spot-tags">
              <text class="tag">文化传承</text>
              <text class="tag">传统建筑</text>
              <text class="tag">民俗风情</text>
              <text class="tag">美食街区</text>
            </view>
          </view>
        </view>

        <!-- 达明美食街 -->
        <view class="spot-card">
          <image class="spot-image" src="/static/logo.png" mode="aspectFill"></image>
          <view class="spot-info">
            <view class="spot-name">达明美食街</view>
            <view class="spot-rating">5星</view>
            <view class="spot-tags">
              <text class="tag">休闲娱乐</text>
              <text class="tag">美食天堂</text>
              <text class="tag">夜市文化</text>
              <text class="tag">特色小吃</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 食宿安排 -->
    <view class="section">
      <view class="section-title">食宿安排</view>
      <view class="arrangement-list">
        <view class="arrangement-item">
          <text class="item-label">住宿：</text>
          <text class="item-content">福州香格里拉大酒店</text>
        </view>
        <view class="arrangement-item">
          <text class="item-label">餐饮：</text>
          <view class="item-content">
            <text>福州香格里拉大酒店中餐厅</text>
            <text>达明美食街</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.section {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.spot-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.spot-card {
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.spot-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.spot-info {
  flex: 1;
  padding: 15px;
}

.spot-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.spot-rating {
  color: #ff6b6b;
  margin-bottom: 10px;
}

.spot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e6f3ff;
  color: #007AFF;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.arrangement-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.arrangement-item {
  display: flex;
  align-items: flex-start;
}

.item-label {
  color: #007AFF;
  font-weight: bold;
  margin-right: 10px;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>