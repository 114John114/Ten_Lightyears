<template>
    <view class="realtime-container">
        <!-- 当前路线 -->
        <view class="route-section">
            <view class="section-title">当前路线</view>
            <view class="route-list">
                <view class="route-item" v-for="(spot, index) in routeData" :key="index">
                    <view class="spot-container">
                        <view class="spot-number">{{index + 1}}</view>
                        <text class="spot-name">{{spot}}</text>
                    </view>
                    <view v-if="index !== routeData.length - 1" class="arrow-container">
                        <image 
                            src="/static/arrow-right.png" 
                            class="arrow-icon"
                            mode="aspectFit"
                        ></image>
                    </view>
                </view>
            </view>
        </view>

        <!-- 未来6小时天气 -->
        <view class="weather-section">
            <view class="section-title">未来6小时天气</view>
            <view class="weather-list">
                <view class="weather-item" v-for="(item, index) in weatherData" :key="index">
                    <text class="time">{{item.time}}</text>
                    <image 
                        :src="getWeatherIcon(item.weather)" 
                        class="weather-icon"
                        mode="aspectFit"
                    ></image>
                    <text class="weather-text">{{item.weather}}</text>
                </view>
            </view>
        </view>

        <!-- 建议模块 -->
        <view class="suggestion-section">
            <view class="section-title">出行建议</view>
            <view class="suggestion-content">
                <text class="suggestion-text">{{suggestion}}</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                routeData: [],  // 路线数据
                weatherData: [], // 天气数据
                suggestion: '',  // 建议内容
                timeInterval: null // 用于存储定时器ID
            }
        },
        methods: {
            // 获取未来6小时的时间段
            getNextSixHours() {
                const hours = [];
                const now = new Date();
                // 获取当前小时
                let currentHour = now.getHours();
                
                // 总是从下一个整点开始
                currentHour += 1;
                
                // 获取接下来6个整点时间
                for (let i = 0; i < 6; i++) {
                    let hour = (currentHour + i) % 24;  // 使用模运算处理跨天的情况
                    hours.push(`${String(hour).padStart(2, '0')}:00`);
                }
                
                return hours;
            },

            // 启动定时器更新时间
            startTimeUpdate() {
                // 立即执行一次更新
                this.updateTimeSlots();
                
                // 每分钟更新一次
                this.timeInterval = setInterval(() => {
                    this.updateTimeSlots();
                }, 60000); // 60000毫秒 = 1分钟
            },

            // 更新时间槽
            updateTimeSlots() {
                const timeSlots = this.getNextSixHours();
                // 更新天气数据中的时间
                this.weatherData = timeSlots.map((time, index) => {
                    const weatherTypes = ['小雨', '多云', '雷雨', '降雪', '晴天', '晴天'];
                    return {
                        time: time,
                        weather: weatherTypes[index]
                    };
                });
            },

            // 获取路线和天气数据的接口
            async getRealtimeData() {
                try {
                    // 这里等待后端接口
                    // const response = await uni.request({
                    //     url: 'YOUR_API_URL',
                    //     method: 'GET'
                    // });
                    // this.routeData = response.data.route;
                    // this.weatherData = response.data.weather;
                    // this.suggestion = response.data.suggestion;
                    
                    // 临时使用模拟数据
                    this.routeData = ['三坊七巷', '福州博物馆', '西湖公园', '南后街'];
                    
                    // 初始化时间和天气数据
                    this.updateTimeSlots();
                    
                    this.suggestion = '由于14：30左右会下小雨，建议改为参观室内景点，如林则徐纪念馆。';
                    
                } catch (e) {
                    uni.showToast({
                        title: '获取实时信息失败',
                        icon: 'none'
                    });
                }
            },
            
            // 获取天气图标
            getWeatherIcon(weather) {
                const iconMap = {
                    '晴天': '/static/sunny.png',
                    '多云': '/static/cloudy.png',
                    '小雨': '/static/light-rain.png',
                    '大雨': '/static/heavy-rain.png',
                    '雷雨': '/static/thunder.png',
                    '降雪': '/static/snow.png'
                }
                return iconMap[weather] || '/static/sunny.png'
            }
        },
        onLoad() {
            this.getRealtimeData();
            this.startTimeUpdate();
        },
        onUnload() {
            // 清理定时器
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
        }
    }
</script>

<style>
.realtime-container {
    padding: 30rpx;
    background-color: #fafafa;
    min-height: 100vh;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;
}

/* 路线部分样式 */
.route-section {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.route-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20rpx 0;
}

.route-item {
    display: flex;
    align-items: center;
}

.spot-container {
    display: flex;
    align-items: center;
    padding: 15rpx 20rpx;
    border-radius: 10rpx;
}

.spot-number {
    width: 36rpx;
    height: 36rpx;
    background-color: #4a90e2;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    margin-right: 15rpx;
    box-shadow: 0 2rpx 4rpx rgba(74, 144, 226, 0.2);
}

.spot-name {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

.arrow-container {
    padding: 0 20rpx;
}

.arrow-icon {
    width: 40rpx;
    height: 40rpx;
}

/* 天气部分样式 */
.weather-section {
    background-color: lightskyblue;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.weather-list {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
}

.weather-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.time {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.weather-icon {
    width: 60rpx;
    height: 60rpx;
    margin: 15rpx 0;
}

.weather-text {
    font-size: 26rpx;
    color: #333;
}

/* 建议部分样式 */
.suggestion-section {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
}

.suggestion-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
    border-radius: 10rpx;
    border: 1rpx solid #eee;
    background-color: aliceblue;
    min-height: 120rpx;
    box-sizing: border-box;
}

.suggestion-text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.6;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
}
</style> 
