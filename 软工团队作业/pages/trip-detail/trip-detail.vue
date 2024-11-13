<template>
	<view class="trip-detail">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="back-icon" @click="goBack">
				<text class="back-text">＜</text>
			</view>
			<text class="title">行程详情</text>
		</view>

		<!-- 地图区域 -->
		<view class="map-container">
			<map 
				class="map"
				:latitude="mapInfo.latitude"
				:longitude="mapInfo.longitude"
				:markers="mapInfo.markers"
				:polyline="mapInfo.polyline"
			></map>
		</view>

		<!-- 行程信息 -->
		<view class="trip-info">
			<view class="day-selector">
				<text class="active">第1天</text>
				<text class="btn-detail" @click="goToDetailedPlan">详细规划</text>
			</view>

			<view class="timeline">
				<view class="timeline-item" v-for="(item, index) in schedule" :key="index">
					<text class="time">{{item.time}}</text>
					<view class="content">
						<view class="location-icon">
							<image :src="item.icon" mode="widthFix"></image>
						</view>
						<text class="location-name">{{item.location}}</text>
					</view>
					<text class="transport" v-if="item.transport">
						{{item.transport}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mapInfo: {
					latitude: 26.0745,
					longitude: 119.2965,
					markers: [
						{
							id: 1,
							latitude: 26.0745,
							longitude: 119.2965,
							title: '鼓山'
						}
						// 添加更多标记点
					],
					polyline: [
						{
							points: [
								{
									latitude: 26.0745,
									longitude: 119.2965
								}
								// 添加更多路线点
							],
							color: '#1890FF',
							width: 4
						}
					]
				},
				schedule: [
					{
						time: '7:30',
						location: '酒店',
						icon: '/static/icons/hotel.png',
						transport: '打车24分钟'
					},
					{
						time: '8:00',
						location: '鼓山',
						icon: '/static/icons/location.png',
						transport: '打车24分钟'
					},
					{
						time: '12:00',
						location: '餐厅',
						icon: '/static/icons/restaurant.png'
					}
				]
			}
		},
		onLoad(options) {
			// 获取传递过来的行程ID
			const tripId = options.id
			// 这里可以根据ID加载具体行程数据
			this.loadTripData(tripId)
		},
		methods: {
			goBack() {
				// 返回上一页面，即my-trips页面
				uni.navigateBack({
					delta: 1  // delta: 1 表示返回到上一个页面
				})
			},
			goToDetailedPlan() {
				uni.navigateTo({
					url: '/pages/detailed-plan/detailed-plan'
				})
			},
			loadTripData(tripId) {
				// 这里添加加载具体行程数据的逻辑
				// 可以调用API获取数据
				console.log('Loading trip data for ID:', tripId)
			}
		}
	}
</script>

<style lang="scss" scoped>
.trip-detail {
	min-height: 100vh;
	background-color: #f5f5f5;

	.header {
		background-color: #1890ff;
		padding: 40rpx 20rpx;
		display: flex;
		align-items: center;
		color: #fff;
		
		.back-icon {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.back-text {
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
			}
		}
		
		.title {
			font-size: 32rpx;
			font-weight: 500;
		}
	}

	.map-container {
		height: 500rpx;
		
		.map {
			width: 100%;
			height: 100%;
		}
	}

	.trip-info {
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		margin-top: -20rpx;
		padding: 20rpx;
		position: relative;
		z-index: 1;

		.day-selector {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #eee;
			
			text {
				font-size: 28rpx;
				color: #333;
				
				&.active {
					font-weight: 500;
				}
			}
			
			.btn-detail {
				color: #1890ff;
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				background-color: #f0f9ff;
			}
		}

		.timeline {
			padding: 20rpx 0;
			
			.timeline-item {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;
				
				.time {
					width: 100rpx;
					font-size: 28rpx;
					color: #333;
				}
				
				.content {
					flex: 1;
					display: flex;
					align-items: center;
					
					.location-icon {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.location-name {
						font-size: 28rpx;
						color: #333;
					}
				}
				
				.transport {
					font-size: 24rpx;
					color: #666;
					margin-left: 20rpx;
				}
			}
		}
	}
}
</style> 