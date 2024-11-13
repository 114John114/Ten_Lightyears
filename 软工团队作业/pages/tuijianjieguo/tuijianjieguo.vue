<template>
  <view class="container">
    <!-- 推荐路线列表 -->
    <view class="route-list">
      <view class="route-card" 
            v-for="(route, index) in recommendRoutes" 
            :key="index"
            @click="navigateToDetail(route)">
        <view class="route-title">{{ route.title }}</view>
        <view class="route-path">{{ route.path }}</view>
        <view class="route-budget">预算：{{ route.budget }}元/人</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface RouteItem {
  title: string
  path: string
  budget: string
  spots: string[] // 添加景点数组
}

export default defineComponent({
  setup() {
    const recommendRoutes = ref<RouteItem[]>([])

    const navigateToDetail = (route: RouteItem) => {
      uni.navigateTo({
        url: '/pages/route-detail/route-detail',
        success: (res) => {
          res.eventChannel.emit('acceptRouteData', route)
        }
      })
    }

    // 处理表单数据并生成推荐路线
    const generateRecommendations = (formData: any) => {
      // 这里可以根据表单数据处理逻辑
      // 示例数据，实际应该根据formData来生成
      recommendRoutes.value = [
        {
          title: '豪华尊享游',
          path: '鼓山 → 三坊七巷 → 达明美食街',
          budget: '1460-2780',
          spots: ['鼓山', '三坊七巷', '达明美食街']
        },
        {
          title: '经济适用游',
          path: '鼓山 → 闽江公园 → 万达广场/老街',
          budget: '860-1280',
          spots: ['鼓山', '闽江公园', '万达广场/老街']
        },
        {
          title: '特种兵穷游',
          path: '青云山 → 鼓山→ 达明美食街',
          budget: '310-580',
          spots: ['青云山', '鼓山', '达明美食街']
        }
      ]
    }

    onMounted(() => {
      // 获取当前页面栈
      const pages = getCurrentPages()
      // 获取当前页面对象
      const currentPage = pages[pages.length - 1]
      // 获取事件通道
      const eventChannel = currentPage.getOpenerEventChannel()
      
      // 监听acceptFormData事件
      eventChannel.on('acceptFormData', (data) => {
        console.log('接收到的表单数据：', data)
        generateRecommendations(data)
      })
    })

    return {
      recommendRoutes,
      navigateToDetail
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.route-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.route-title {
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.route-path {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.route-budget {
  font-size: 14px;
  color: #666;
}
</style> 