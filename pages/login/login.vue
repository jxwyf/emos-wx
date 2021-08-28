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
				uni.navigateTo({
					url:"../register/register"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
