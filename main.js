import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

let baseUrl = "http://127.0.0.1:8080/emos-wx-api"
//
Vue.prototype.url = {
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckIn:  baseUrl + "/checkin/validCanCheckIn",
	searchTodayCheckin:  baseUrl + "/checkin/searchTodayCheckin",
	searchUserSummary:  baseUrl + "/user/searchUserSummary",
	searchMonthCheckin:  baseUrl + "/checkin/searchMonthCheckin",
	refreshMessage:  baseUrl + "/message/refreshMessage",
	searchMessageByPage:  baseUrl + "/message/searchMessageByPage",
	searchMessageById:  baseUrl + "/message/searchMessageById",
	updateUnreadMessage:  baseUrl + "/message/updateUnreadMessage",
	deleteMessageRefById:  baseUrl + "/message/deleteMessageRefById",
	searchMyMeetingListByPage:  baseUrl + "/meeting/searchMyMeetingListByPage",
}
//全局权限校验
Vue.prototype.checkPermission = function(perms){
	let permission = uni.getStorageSync("permission");
	let result = false
	for(let one of perms){
		if(permission.indexOf(one)!=-1){
			result = true
			break;
		}
	}
	return result;
}
//ajax
Vue.prototype.ajax = function(url, method, data, fun){
	uni.request({
		"url": url,
		"method": method,
		"header":{
			token:uni.getStorageSync("token")
		},
		"data":data,
		success:function(resp){
			if(resp.statusCode == 401){
				uni.redirectTo({
					url:"/pages/login/login.vue"
				})
			}
			else if(resp.statusCode == 200 && resp.data.code == 200){
				let data = resp.data
				if(data.hasOwnProperty("token")){
					let token = data.token
					uni.setStorageSync("token",token)
				}
				fun(resp)
			}
			//显示异常
			else{
				uni.showToast({
					icon:"none",
					title: resp.data
				})
			}
		}
	})
}