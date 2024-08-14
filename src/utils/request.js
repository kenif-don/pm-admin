// 导入axios
import axios from 'axios'
// 使用element-ui Message做消息提醒
import {ElMessage,ElLoading} from 'element-plus';
import router from '../router'
import {getMsg} from "@/utils/i18n";

let loading;
//1. 创建新的axios实例
const service = axios.create({
	// 公共接口
	baseURL:import.meta.env.VITE_HTTP_HOST,
	// 超时时间 单位是ms
	timeout: 60 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
	//如果是post请求 并且没有显示配置请求头时 默认用json格式
	if(config.method==="post"&&!config.headers["Content-Type"]){
		config.headers = {
			'Content-Type':'application/json'
		}
	}
	//原本的签名方法
	//如果缓存中有token时 将之加入到header中
	config.headers["v-token"] = localStorage.getItem("v-token");
	//可以在请求时设置noLoading为true关闭loading动画
	if(!config.noLoading){
		loading = ElLoading.service({
			lock: true,
			text: '加载中...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		})
	}
	return config
}, error => {
	loading && loading.close();
	throw error;
})

// 3.响应拦截器
service.interceptors.response.use(response => {
	loading && loading.close();
	//是下载
	if(response.headers['content-disposition']){
		let filename = response.headers['content-disposition'].match(/filename=(.*)/)[1];
		// 将二进制流转为blob
		const blob = new Blob([response.data], { type: response.headers['content-type']})
		if (typeof window.navigator.msSaveBlob !== 'undefined') {
			// 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
			window.navigator.msSaveBlob(blob, decodeURI(filename))
		} else {
			// 创建新的URL并指向File对象或者Blob对象的地址
			const blobURL = window.URL.createObjectURL(blob)
			// 创建a标签，用于跳转至下载链接
			const tempLink = document.createElement('a')
			tempLink.style.display = 'none'
			tempLink.href = blobURL
			tempLink.setAttribute('download', decodeURI(filename))
			// 兼容：某些浏览器不支持HTML5的download属性
			if (typeof tempLink.download === 'undefined') {
				tempLink.setAttribute('target', '_blank')
			}
			// 挂载a标签
			document.body.appendChild(tempLink)
			tempLink.click()
			document.body.removeChild(tempLink)
			// 释放blob URL地址
			window.URL.revokeObjectURL(blobURL)
		}
		return
	}
	//报错了统一处理方法 300以下的状态码是为后台准备的表示成功的状态码
	if(response.data){
		if(response.data.code===200){
			return Promise.resolve(response.data.data||{})
		}else if(response.data.code===401){
			//跳往登录
			router.push('/login');
			throw new Error(getMsg(response.data.msg))
		}else if(response.data.code===500){
			ElMessage.error({
				message:getMsg(response.data.msg),
				duration:3500,
			})
			throw new Error(getMsg(response.data.msg));
		}
	}
	ElMessage.error({
		message:"网络异常",
		duration:3500
	})
	throw new Error("网络异常");
}, error => {
	loading&&loading.close();
	if(!error.response){
		ElMessage.error("网络错误");
		throw error;
	}
	switch (error.response.status) {
		case 404:
			error.message = "请求URL不存在,请检查后重试";
			break;
		default:
			error.message = "网络错误";
			break;
	}
	ElMessage.error(error.message);
	throw error
})
//4.导入文件
export default service
