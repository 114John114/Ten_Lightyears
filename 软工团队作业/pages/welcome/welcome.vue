<template>
  <view class="container">
	  <image class="welcome-image" src="/static/mainlogo.png"> </image>
    <view class="welcome-text">
      <text>行趣</text>
    </view>
    <view class="button-group">
      <button @click="navigateToLogin">登录</button>
      <button @click="navigateToRegister">注册</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    // 跳转到登录页面
    navigateToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    // 跳转到注册页面
    navigateToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    }
  }
};
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		flex-direction: column;
}

	.welcome-text {
		margin-bottom: 50px;
		font-size: 60rpx;
		font-weight: 700;
}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 20px;
}

	.welcome-image{
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 50rpx;
			justify-content: center;
}

button {
  width: 200px;
  padding: 15px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
}
</style>
