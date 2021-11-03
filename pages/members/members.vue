<template>
	<view class="page">
		<checkbox-group @change="selected">
			<block v-for="dept in list" :key="dept.id">
				<view class="list-title">
					{{dept.deptName}} （{{dept.count}}）人
				</view>
				<view class="item" v-for="member in dept.members" :key="member.userId">
					<view class="key">
						{{member.name}}
					</view>
					<checkbox class="value" :value="member.userId" :checked="member.checked"></checkbox>
				</view>
			</block>
		</checkbox-group>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				members:[]
			}
		},
		methods: {
			
		}
	}
</script>


<style lang="less">
	@import url("members.less");
</style>
