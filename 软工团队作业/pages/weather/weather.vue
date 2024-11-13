<template>
	<view class="weather-container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-bar">
				<image 
					src="/static/search.png" 
					class="search-icon"
					mode="aspectFit"
				></image>
				<input 
					type="text" 
					v-model="searchKey" 
					placeholder="搜索城市天气" 
					placeholder-class="placeholder"
					@confirm="handleSearch"
				/>
			</view>
		</view>

		<!-- 当前天气信息 -->
		<view class="current-weather">
			<view class="location">
				<view class="city-container">
					<text class="city">{{weatherData.city}}</text>
					<image 
						src="/static/location.png" 
						class="location-icon"
						mode="aspectFit"
					></image>
				</view>
			</view>
			<view class="temp-range-today">
				<text>最高 {{weatherData.todayTemp.max}}°</text>
				<text class="divider">|</text>
				<text>最低 {{weatherData.todayTemp.min}}°</text>
			</view>
			<view class="temp-box">
				<view class="temperature-container">
					<text class="temperature">{{weatherData.temperature}}°</text>
				</view>
				<view class="weather-info">
					<text class="weather-desc">{{weatherData.weather}}</text>
					<image 
						:src="getWeatherIcon(weatherData.weather)" 
						class="weather-icon"
						mode="aspectFit"
					></image>
				</view>
			</view>
			<view class="current-date">{{currentDate}}</view>
			<view class="weather-detail">
				<view class="detail-item">
					<image 
						src="/static/air.png" 
						class="detail-icon"
						mode="aspectFit"
					></image>
					<text>空气质量</text>
					<text>{{weatherData.airQuality}}</text>
				</view>
				<view class="detail-item">
					<image 
						src="/static/wind.png" 
						class="detail-icon"
						mode="aspectFit"
					></image>
					<text>风向风力</text>
					<text>{{weatherData.wind}}</text>
				</view>
				<view class="detail-item">
					<image 
						src="/static/humidity.png" 
						class="detail-icon"
						mode="aspectFit"
					></image>
					<text>相对湿度</text>
					<text>{{weatherData.humidity}}%</text>
				</view>
				<view class="detail-item">
					<image 
						src="/static/sunrise.png" 
						class="detail-icon"
						mode="aspectFit"
					></image>
					<text>日出日落</text>
					<text>{{weatherData.sunTime}}</text>
				</view>
			</view>
		</view>
		
		<!-- 未来天气预报 -->
		<view class="forecast">
			<view class="forecast-title">未来天气预报</view>
			<view class="forecast-list">
				<view class="forecast-item" v-for="(item, index) in weatherData.forecast" :key="index">
					<text class="date">{{item.date}}</text>
					<view class="forecast-weather">
						<text class="day-weather">{{item.dayWeather}}</text>
						<image 
							:src="getWeatherIcon(item.dayWeather)" 
							class="forecast-weather-icon"
							mode="aspectFit"
						></image>
					</view>
					<text class="temp-range">{{item.tempMin}}° / {{item.tempMax}}°</text>
				</view>
			</view>
		</view>
		
		<view class="action-buttons">
			<button class="action-btn" @click="handleRealtime">实时调整</button>
			<button class="action-btn" @click="handlePrepare">未雨绸缪</button>
		</view>
	</view>
</template>

<script>
export default {
    data() {
        return {
            searchKey: '',
            currentDate: '',
            isLocating: false,
            apiConfig: {
                openWeatherKey: 'YOUR_OPENWEATHER_API_KEY',
                locationIQKey: 'YOUR_LOCATIONIQ_API_KEY',
                units: 'metric',
                lang: 'zh_cn'
            },
            location: {
                lat: null,
                lon: null
            },
            weatherData: {
                city: '',
                temperature: null,
                todayTemp: {
                    max: null,
                    min: null
                },
                weather: '',
                airQuality: '',
                wind: '',
                humidity: '',
                sunTime: '',
                forecast: []
            }
        }
    },
    methods: {
        // 获取当前位置并显示天气
        async getCurrentLocationWeather() {
            this.isLocating = true;
            try {
                const location = await uni.getLocation({
                    type: 'gcj02'
                });
                
                this.location.lat = location.latitude;
                this.location.lon = location.longitude;
                
                await this.getCityNameByCoords(this.location.lat, this.location.lon);
                await this.getWeatherByCoords();
                
            } catch (error) {
                console.error('获取当前位置天气失败:', error);
                uni.showToast({
                    title: '定位失败，请手动搜索城市',
                    icon: 'none'
                });
            } finally {
                this.isLocating = false;
            }
        },

        // 根据坐标获取城市名
        async getCityNameByCoords(lat, lon) {
            try {
                const response = await uni.request({
                    url: 'https://us1.locationiq.com/v1/reverse.php',
                    method: 'GET',
                    data: {
                        key: this.apiConfig.locationIQKey,
                        lat: lat,
                        lon: lon,
                        format: 'json'
                    }
                });

                if (response.data && response.data.address) {
                    this.weatherData.city = response.data.address.city || '未知城市';
                }
            } catch (error) {
                console.error('获取城市名称失败:', error);
                this.weatherData.city = '未知城市';
            }
        },

        // 根据城市名获取坐标
        async getCityCoordinates(cityName) {
            try {
                const response = await uni.request({
                    url: 'https://us1.locationiq.com/v1/search.php',
                    method: 'GET',
                    data: {
                        key: this.apiConfig.locationIQKey,
                        q: cityName,
                        format: 'json'
                    }
                });
                
                if (response.data && response.data[0]) {
                    this.location.lat = response.data[0].lat;
                    this.location.lon = response.data[0].lon;
                    return true;
                }
                return false;
            } catch (error) {
                console.error('获取城市坐标失败:', error);
                return false;
            }
        },

        // 使用坐标获取天气数据
        async getWeatherByCoords() {
            try {
                // 获取天气数据
                const weatherResponse = await uni.request({
                    url: 'https://api.openweathermap.org/data/2.5/onecall',
                    method: 'GET',
                    data: {
                        lat: this.location.lat,
                        lon: this.location.lon,
                        appid: this.apiConfig.openWeatherKey,
                        units: this.apiConfig.units,
                        lang: this.apiConfig.lang
                    }
                });

                // 获取空气质量数据
                const airResponse = await uni.request({
                    url: 'http://api.openweathermap.org/data/2.5/air_pollution',
                    method: 'GET',
                    data: {
                        lat: this.location.lat,
                        lon: this.location.lon,
                        appid: this.apiConfig.openWeatherKey
                    }
                });

                if (weatherResponse.data && airResponse.data) {
                    this.updateWeatherData(weatherResponse.data, airResponse.data);
                }
            } catch (error) {
                console.error('获取天气数据失败:', error);
                uni.showToast({
                    title: '获取天气信息失败',
                    icon: 'none'
                });
            }
        },

        // 更新天气数据
        updateWeatherData(weatherData, airData) {
            const aqiLevel = ['', '优', '良', '轻度污染', '中度污染', '重度污染'];
            const aqi = airData.list && airData.list[0] ? aqiLevel[airData.list[0].main.aqi] : '暂无数据';

            this.weatherData = {
                ...this.weatherData,
                temperature: Math.round(weatherData.current.temp),
                todayTemp: {
                    max: Math.round(weatherData.daily[0].temp.max),
                    min: Math.round(weatherData.daily[0].temp.min)
                },
                weather: weatherData.current.weather[0].description,
                airQuality: aqi,
                wind: `${this.getWindDirection(weatherData.current.wind_deg)} ${Math.round(weatherData.current.wind_speed)}m/s`,
                humidity: weatherData.current.humidity,
                sunTime: this.formatSunTime(weatherData.current.sunrise, weatherData.current.sunset),
                forecast: this.formatForecastData(weatherData.daily)
            };
        },

        // 处理搜索
        async handleSearch() {
            if (!this.searchKey.trim()) {
                uni.showToast({
                    title: '请输入城市名称',
                    icon: 'none'
                });
                return;
            }

            uni.showLoading({
                title: '加载中...'
            });

            try {
                const hasCoordinates = await this.getCityCoordinates(this.searchKey);
                if (!hasCoordinates) {
                    throw new Error('无法获取城市坐标');
                }

                await this.getWeatherByCoords();
                this.weatherData.city = this.searchKey;
                
            } catch (error) {
                console.error('搜索城市天气失败:', error);
                uni.showToast({
                    title: '获取天气信息失败',
                    icon: 'none'
                });
            } finally {
                uni.hideLoading();
            }
        },

        // 获取风向
        getWindDirection(deg) {
            const directions = ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'];
            return directions[Math.round(deg / 45) % 8];
        },

        // 格式化日出日落时间
        formatSunTime(sunrise, sunset) {
            const formatTime = (timestamp) => {
                const date = new Date(timestamp * 1000);
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            };
            return `${formatTime(sunrise)}/${formatTime(sunset)}`;
        },

        // 格式化预报数据
        formatForecastData(dailyData) {
            return dailyData.slice(1, 6).map(day => ({
                date: this.formatForecastDate(day.dt),
                dayWeather: day.weather[0].description,
                tempMin: Math.round(day.temp.min),
                tempMax: Math.round(day.temp.max)
            }));
        },

        // 格式化预报日期
        formatForecastDate(timestamp) {
            const date = new Date(timestamp * 1000);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const weekDay = weekDays[date.getDay()];
            return `${month}/${day} ${weekDay}`;
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
        },

        // 更新当前日期
        updateDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            this.currentDate = `${year}-${month}-${day}`;
        },

        // 页面跳转方法
        handleRealtime() {
            uni.navigateTo({
                url: '/pages/realtime/realtime'
            });
        },
        
        handlePrepare() {
            uni.navigateTo({
                url: '/pages/prepare/prepare'
            });
        },
    },
    
    async onLoad() {
        this.updateDateTime();
        await this.getCurrentLocationWeather();
    },
    
    onUnload() {
        // 清理工作
    }
}
</script>

<style>
.weather-container {
    padding: 0 0 30rpx 0;
    background-color: #f5f6fa;
    min-height: 100vh;
}

.search-box {
    padding: 20rpx 30rpx;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
}

.search-bar {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 36rpx;
    padding: 15rpx 24rpx;
    height: 70rpx;
    box-sizing: border-box;
}

.search-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 16rpx;
}

.search-bar input {
    flex: 1;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
}

.placeholder {
    color: #999;
    font-size: 28rpx;
}

.current-weather {
    margin: 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
}

.location {
    display: flex;
    justify-content: center;
    margin-bottom: 20rpx;
}

.city-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.city {
    font-size: 48rpx;
    font-weight: bold;
}

.location-icon {
    width: 40rpx;
    height: 40rpx;
    margin-left: 10rpx;
}

.temp-box {
    position: relative;
    height: 160rpx;
    margin: 30rpx 0;
}

.temperature-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.temperature {
    font-size: 120rpx;
    font-weight: bold;
    line-height: 160rpx;
}

.weather-info {
    position: absolute;
    right: 40rpx;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
}

.weather-desc {
    font-size: 36rpx;
    color: #333;
}

.weather-icon {
    width: 60rpx;
    height: 60rpx;
    margin-left: 10rpx;
}

.weather-detail {
    display: flex;
    flex-wrap: wrap;
    border-top: 1rpx solid #eee;
    padding-top: 30rpx;
}

.detail-item {
    width: 50%;
    text-align: center;
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.detail-icon {
    width: 56rpx;
    height: 56rpx;
    margin-bottom: 10rpx;
}

.detail-item text {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 6rpx;
}

.detail-item text:last-child {
    color: #333;
    font-size: 28rpx;
}

.forecast {
    margin: 0 30rpx 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
}

.forecast-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.forecast-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eee;
}

.forecast-item:last-child {
    border-bottom: none;
}

.forecast-weather {
    display: flex;
    align-items: center;
}

.forecast-weather-icon {
    width: 40rpx;
    height: 40rpx;
    margin-left: 10rpx;
}

.temp-range-today {
    text-align: center;
    margin-bottom: 20rpx;
    color: #666;
    font-size: 28rpx;
}

.temp-range-today .divider {
    margin: 0 20rpx;
    color: #ddd;
}

.action-buttons {
    margin: 0 30rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    align-items: center;
}

.action-btn {
    width: 80%;
    height: 100rpx;
    line-height: 80rpx;
    background-color: skyblue;
    border-radius: 20rpx;
    font-size: 38rpx;
    color: #333;
    margin: 15rpx;
}

.current-date {
    text-align: center;
    font-size: 38rpx;
    color: #666;
    margin-bottom: 30rpx;
}
</style>
