<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">企业办公管理系统</view>
		<view class="logo-subtitle">Ver 0.0.1</view>
		<!-- open-type="getUserInfo" 获取微信用户信息 -->
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登录系统</button>
		<view class="register-container">
			没有账号
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toRegister:function(){
				//跳转到注册页
				uni.navigateTo({
					url:"../register/register"
				})
			},
			login:function(){
				let that = this
				uni.login({
					provider:"weixin",
					success:function(resp){
						let code = resp.code
						that.ajax(that.url.login,"POST",{"code":code},function(resp){
							let permission = resp.data.permission
							 uni.setStorageSync("permission",permission)
						})
						console.log(resp);
						//跳转到首页
						uni.switchTab({
							url:"../index/index"
						})
					},
					// 没有获得临时授权id 
					fail:function(e){
						uni.showToast({
							icon:"none",
							title: "执行异常"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
