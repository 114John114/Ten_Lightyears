<template>
  <view class="container">
    <view class="form">
      <input class="login_input1" v-model="username" placeholder="请输入用户名" />
      <input class="login_input1" v-model="password" placeholder="请输入密码" type="password" />
      <button class="login_button1" @click="login" :disabled="loading">登录</button>
      <text  v-if="errorMessage">{{ errorMessage }}</text>
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
      errorMessage: '',
      loading: false // 加载状态
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = '用户名和密码不能为空';
        return;
      }

      this.loading = true; // 设置加载状态为 true

      try {
        const response = await uniCloud.callFunction({
          name: 'loginuser',
          data: {
            username: this.username,
            password: this.password
          }
        });

        this.loading = false; // 请求完成后设置加载状态为 false

        if (response.result.code === 200) {
          // 登录成功，存储用户信息
		  uni.setStorage({
			  key: 'username', // 存储的键
			  data: this.username, // 存储的值
		  });
          uni.setStorage({
            key: 'userInfo',
            data: response.result.userInfo,
			
            success: () => {
              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });
              uni.switchTab({
                url: '/pages/tabbar/shouye/shouye'
              });
            }
          });
        } else {
          this.errorMessage = response.result.message;
        }
      } catch (error) {
        this.loading = false; // 请求完成后设置加载状态为 false
        this.errorMessage = '登录失败，请重试';
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

.login_input1 {
  padding: 10px;
  justify-content:center;
  margin: 10px 0;
  border: 1px solid #ccc;
}

 .login_button1 {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
} 


.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* 调整间距 */
}

.spinner {
  width: 20px; 
  height: 20px; 
  border: 4px solid #ccc; 
  border-top: 4px solid #007aff;
  border-radius: 50%; /* 圆形 */
  animation: spin 1s linear infinite; 
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
