<template>
    <view class="trip-modify">
      <!-- 地图区域 -->
      <view class="map-wrapper">
        <map class="map"
             :latitude="latitude"
             :longitude="longitude"
             :markers="markers"
             :polyline="polyline"
             show-location>
        </map>
      </view>
      
      <!-- 可拖拽内容区 -->
      <view class="content-wrapper"
            :style="{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s'
            }">
        <!-- 拖拽区域 -->
        <view class="drag-area"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd">
          <view class="drag-bar"></view>
        </view>
  
        <!-- 实际内容区 -->
        <view class="content">
          <!-- 这里放行程内容 -->
          <view>这里是可滚动的内容</view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDragging: false,
        startY: 0,
        translateY: 400,
  
        // 地图数据
        latitude: 39.909,
        longitude: 116.397,
        markers: [],
        polyline: [],
  
        // 屏幕高度
        screenHeight: 0,
        // 内容区最小和最大位置
        minY: 100,
        maxY: 0
      }
    },
  
    onLoad() {
      // 获取屏幕高度和可拖动范围
      const systemInfo = uni.getSystemInfoSync()
      this.screenHeight = systemInfo.windowHeight
      this.minY = 100 // 展开时距顶部距离
      this.maxY = this.screenHeight - 300 // 收起时距顶部距离
      this.translateY = (this.minY + this.maxY) / 2 // 初始位置
    },
  
    methods: {
      touchStart(event) {
        this.isDragging = true;
        this.startY = event.touches[0].pageY;
        this.startTranslateY = this.translateY;
      },
  
      touchMove(event) {
        if (!this.isDragging) return;
  
        const currentY = event.touches[0].pageY;
        const deltaY = currentY - this.startY;
        let newTranslateY = this.startTranslateY + deltaY;
  
        // 限制拖动范围并添加阻尼效果
        if (newTranslateY < this.minY) {
          newTranslateY = this.minY + (newTranslateY - this.minY) * 0.3;
        } else if (newTranslateY > this.maxY) {
          newTranslateY = this.maxY + (newTranslateY - this.maxY) * 0.3;
        }
  
        this.translateY = newTranslateY;
      },
  
      touchEnd() {
        this.isDragging = false;
  
        // 判断最终位置
        const middleY = (this.minY + this.maxY) / 2;
        if (this.translateY < middleY) {
          this.translateY = this.minY; // 展开
        } else {
          this.translateY = this.maxY; // 收起
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .trip-modify {
    height: 100vh;
    overflow: hidden;
  
    .map-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
  
      .map {
        width: 100%;
        height: 100%;
      }
    }
  
    .content-wrapper {
      position: relative; /* 改为 relative */
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: calc(100vh - 100px);
      background: #fff;
      border-radius: 20rpx 20rpx 0 0;
      z-index: 2;
      will-change: transform;
      touch-action: none;
  
      .drag-area {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
  
        .drag-bar {
          width: 60rpx;
          height: 8rpx;
          background: #DCDFE6;
          border-radius: 4rpx;
        }
      }
  
      .content {
        height: calc(100% - 80rpx);
        overflow-y: auto;
        padding: 20rpx;
      }
    }
  }
  </style>
  