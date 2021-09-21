<template>
	<view>
		<!-- 取景框 -->
		<camera device-position="front" flash="off" class="camera" @error="error" v-if="showCamera"></camera>
		<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
		<view class="operate-container">
			<button type="primary" class="btn" @tap="clackBtn" :disabled="canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候 必须要拍摄自己的正面照片 侧面照片会导致无法识别</text>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		
		data() {
			return {
				canCheckin:false,
				photoPath:'',
				btnText:'拍照',
				showCamera:true,
				showImage:false
				
			}
		},
		onLoad:function(){
			qqmapsdk = new QQMapWX({
				key:"IIZBZ-INV6W-GWORV-RZXE2-MF2S5-VUFLF"
			})
		},
		methods: {
			clackBtn:function(){
				let that = this;
				if(that.btnText=='拍照'){
					let ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality:"high",
						success:function(resp){
							console.log(resp.tempImagePath);
							that.photoPath = resp.tempImagePath;
							that.showCamera = false
							that.showImage = true
							that.btnText = '签到'
						} 
					})
				}else{
					//执行签到功能
					uni.showLoading({
						title:"签到中请稍后"
					})
					setTimeout(function(){
						uni.hideLoading()
					},3000)
					//获得地理位置信息
					uni.getLocation({
						type:"wgs84",
						success:function(resp){
							//保存经纬度
							let latitude = resp.latitude;
							let longitude = resp.longitude;
							// console.log("经度"+latitude)
							// console.log("维度"+longitude)
							qqmapsdk.reverseGeocoder({
								location:{
									latitude:latitude,
									longitude:longitude
								},
								success:function(resp){
									console.log(resp.result)
									//获得地址数据
									let address = resp.result.address;
									let addressComponent = resp.result.address_component;
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let districe = addressComponent.districe;
									
								}
							})
							
						}
					})
				}
			},
			afresh:function(){
				let that = this;
				that.showCamera = true
				that.showImage = false
				that.btnText = "拍照"
			}
			
		}
	}
</script>

<style lang="less">
@import url("checkin.less");
</style>
