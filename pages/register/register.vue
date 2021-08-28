<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
		<view class="register-container">
			<input type="text" placeholder="输入你的邀请码" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">管理员创建员工证账号之后 你可以从你的个人邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
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
			register:function(){
				uni.login({
					provider:"weixin",
					success:function(resp){
						let code = resp.code;
						// 获取微信账号基本信息
						uni.getUserInfo({
							provider:"weixin",
							success:function(resp){
								//用户昵称
								let nickName = resp.userInfo.nickName;
								//用户头像url
								let acatarUrl = resp.userInfo.avatarUrl;
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
