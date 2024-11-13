<template>
  <view class="container">
    <view class="form">
      <input class='reg_input1'
        v-model="username" 
        placeholder="请输入用户名" 
        id="username" 
        name="username" 
      />
      <input class='reg_input1'
        v-model="password" 
        placeholder="请输入密码" 
        type="password" 
        id="password" 
        name="password" 
      />
      <input class='reg_input1'
        v-model="confirmPassword" 
        placeholder="请确认密码" 
        type="password" 
        id="confirmPassword" 
        name="confirmPassword" 
      />
      <button class="reg_button1" @click="register" :disabled="loading">注册</button>
      <text v-if="errorMessage">{{ errorMessage }}</text>
      <view v-if="loading" class="loading-spinner">
        <div class="spinner"></div> <!-- 旋转加载器 -->
        <text>加载中...</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false // 加载状态
    };
  },
  methods: {
    async register() {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.errorMessage = '所有字段不能为空';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = '密码和确认密码不一致';
        return;
      }

      this.loading = true; // 设置加载状态为 true

      try {
        const response = await uniCloud.callFunction({
          name: 'registeruser',
          data: {
            username: this.username,
            password: this.password
          }
        });

        this.loading = false; // 请求完成后设置加载状态为 false

        if (response.result.code === 200) {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          });
          uni.navigateTo({
            url: '/pages/login/login'
          });
        } else {
          this.errorMessage = response.result.message;
        }
      } catch (error) {
        this.loading = false; // 请求完成后设置加载状态为 false
        this.errorMessage = '注册失败，请重试';
      }
    }
  }
};
</script>

<style >
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 80%;
  max-width: 300px;
}

.reg_input1 {
  padding: 10px;
  justify-content:center;
  margin: 10px 0;
  border: 1px solid #ccc;
}



.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px; 
}
.reg_button1 {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
} 
.spinner {
  width: 20px; 
  height: 20px; 
  border: 4px solid #ccc; 
  border-top: 4px solid #007aff; 
  border-radius: 50%; 
  animation: spin 1s linear infinite; 
  margin-right: 10px; 
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
