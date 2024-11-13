<template>
  <view class="container">
    <view class="form-container">
      <!-- 旅游计划输入区域 -->
      <view class="form-title">请填写您的旅游计划</view>

      <!-- 目的地 -->
      <view class="form-item">
        <text class="label">目的地：</text>
        <input type="text" placeholder="如福建省福州市鼓楼区，仅限国内" v-value="formData.destination" />
      </view>

      <!-- 时间选择 -->
      <view class="form-item">
        <text class="label">时间：</text>
        <view class="date-picker">
          <input type="text" placeholder="如2024/10/25" v-value="formData.startDate" />
          <text class="separator">至</text>
          <input type="text" placeholder="如2024/11/04" v-value="formData.endDate" />
        </view>
      </view>

      <!-- 预算 -->
      <view class="form-item">
        <text class="label">预算：</text>
        <view class="budget-input">
          <input type="number" placeholder="请输入数字" v-value="formData.budgetMin" />
          <text class="separator">—</text>
          <input type="number" placeholder="请输入数字" v-value="formData.budgetMax" />
          <text>元</text>
        </view>
      </view>

      <!-- 特殊需求选项 -->
      <view class="form-title sub">请勾选您对旅游景点的要求</view>
      
      <view class="checkbox-group">
        <view class="checkbox-item">
          <text>无障碍设施：</text>
          <radio-group v-value="formData.accessibility">
            <radio value="yes">是</radio>
            <radio value="no">否</radio>
          </radio-group>
        </view>

        <view class="checkbox-item">
          <text>亲子友好：</text>
          <radio-group v-value="formData.kidFriendly">
            <radio value="yes">是</radio>
            <radio value="no">否</radio>
          </radio-group>
        </view>

        <view class="checkbox-item">
          <text>宠物友好：</text>
          <radio-group v-value="formData.petFriendly">
            <radio value="yes">是</radio>
            <radio value="no">否</radio>
          </radio-group>
        </view>
      </view>

      <!-- 个性需求输入区域 -->
      <view class="form-title sub">请填写您对旅游景点的个性需求(选填)</view>
      <view class="requirement-section">
        <view class="form-item">
          <text class="required">*</text>
          <text>自然景观：</text>
          <input type="text" placeholder="如草原/海滩/雪山" v-value="formData.naturalLandscape" />
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text>社会景观：</text>
          <input type="text" placeholder="如纪念馆/博物馆/科技馆" v-value="formData.socialLandscape" />
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text>周边饮食：</text>
          <input type="text" placeholder="如闽菜/川菜/粤菜" v-value="formData.cuisine" />
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text>其余需求：</text>
          <input type="text" placeholder="填写对景点的其余需求" v-value="formData.otherNeeds" />
        </view>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @click="submitForm">
        提交获得景点推荐
        
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const formData = reactive({
      destination: '',
      startDate: '',
      endDate: '',
      budgetMin: '',
      budgetMax: '',
      accessibility: 'no',
      kidFriendly: 'no',
      petFriendly: 'no',
      naturalLandscape: '',
      socialLandscape: '',
      cuisine: '',
      otherNeeds: ''
    })

    const submitForm = () => {
      // 这里可以添加表单验证逻辑
      
      // 跳转到推荐结果页面并传递数据
      uni.navigateTo({
        url: '/pages/tuijianjieguo/tuijianjieguo',
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptFormData', formData)
        }
      })
    }

    return {
      formData,
      submitForm
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.form-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-title.sub {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  width: 80px;
  flex-shrink: 0;
}

input {
  flex: 1;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.budget-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.separator {
  color: #666;
}

.checkbox-group {
  margin: 15px 0;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

radio-group {
  display: flex;
  gap: 20px;
}

.required {
  color: #ff4d4f;
  margin-right: 5px;
}

.requirement-section {
  margin-top: 15px;
}

.submit-btn {
  margin-top: 10px;
  width: 100%;
  height:70px;
  background-color: #007AFF;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}


</style> 
