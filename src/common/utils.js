import config from "@/common/config";

export function msg(content,time=3000){
	uni.showToast({
		icon:'none',
		title: content,
		duration: time
	});
}

export function showLoading(content="加载数据中...",mask=true){
	uni.showLoading({
	    title: content,
		mask: mask
	});
}

export function hideLoading(timer=0){
	if(timer > 0){
		var t = setTimeout(function () {
		    uni.hideLoading();
			clearTimeout(t);
		}, timer);
	}else{
		uni.hideLoading();
	}
}

export function in_array(search,array){
	let flag = false;
	for(let i in array){
		if(array[i]==search){
			flag = true;
			break;
		}
	}

	return flag;
}

export function isDataType(data,type){
	return Object.prototype.toString.call(data) === '[object '+type+']';
}

export function ltrim(str,char){
	let pos = str.indexOf(char);
	let sonstr = str.substr(pos+1);
	return sonstr;
}

export function rtrim(str,char){
	let pos = str.lastIndexOf(char);
	let sonstr = str.substr(0,pos);
	return sonstr;
}

/**
 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
 */
export function navigateTo(url,params){
	uni.navigateTo({
		url: parseUrl(url,params)
	})
}

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 */
export function redirectTo(url,params){
	uni.redirectTo({
		url: parseUrl(url,params)
	});
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 */
export function reLaunch(url,params){
	uni.reLaunch({
		url: parseUrl(url,params)
	});
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 */
export function switchTab(url,params){
	uni.switchTab({
		url: parseUrl(url,params)
	});
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 */
export function navigateBack(delta){
	uni.navigateBack({
		delta: delta
	});
}

/**
 * 预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快。
 */
export function preloadPage(url, params){
	uni.preloadPage({
		url: parseUrl(url,params)
	});
}

export function prePage(){
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

/**
 * rpx转px
 * @param int|float num
 */
export function rpx2px(num){
	// const info = uni.getSystemInfoSync()
	// let scale = 750 / info.windowWidth;
	// return (Number.isNaN(parseFloat(num)) ? 0 : parseFloat(num)) / scale;
	return uni.upx2px(num);
}

/**
 * @param int|float num
 */
export function px2rpx(num){
	return num/(uni.upx2px(num)/num);
}

/**
 * 获取窗口的宽高
 */
export function getSystemInfo(){
	const info = uni.getSystemInfoSync();
	return {
		w: info.windowWidth,
		h: info.windowHeight
	};
}

function parseUrl(url,params){
	let arr = [];
	let string = '';
	for(let i in params){
		arr.push(i + "=" + params[i]);
	}
	
	string = "/pages/" + url;
	if(arr.length > 0){
		string += "?" + arr.join("&");
	}
	
	return string;
}


/**
 * @description 上传图片
 * @param  { String } path 选择的本地地址
 */
export function uploadFile(path,token, filename,key) {
	return new Promise((resolve, reject) => {

		console.log('uploadFile',path,token, filename,key,config.uploadPath);
		uni.uploadFile({
			url: config.uploadPath,//华东地区上传
			filePath: path,
			name: 'file',
			formData: {
				'key': filename,
				'token': token,
			},
			// formData: {
			// 	'key': key,//key值
			// 	'token': token //七牛云token值
			// },
			success: (uploadFileRes) => {

				console.log('uploadFileRes',uploadFileRes);
				//uploadFileRes 返回了data是一个json字符串
				// //拿到里面的key拼接上域名，再反出去就ok了
				let strToObj=JSON.parse(uploadFileRes.data),
					backUrl=  strToObj.key;
				// data.success(backUrl);//反出去链接
				uni.hideLoading();
			},
			fail: fail => {
				uni.showToast({ title: "网络错误", icon: "none" });
				data.fail(fail);//反出去错误信息
				uni.hideLoading();
			}
		})









		//
		// uni.uploadFile({
		// 	url: config.uploadPath,
		// 	filePath: path,
		// 	name: filename,
		// 	header: {
		// 		token
		// 	},
		// 	fileType: 'image',
		// 	success: (res) => {
		// 		console.log('uploadFile res ==> ', res)
		// 		const data = JSON.parse(res.data)
		// 		if (data.code == 1) {
		// 			resolve(data.data)
		// 		} else {
		// 			reject()
		// 		}
		// 	},
		// 	fail: (err) => {
		// 		console.log('uploadFile', path, token, filename,err);
		// 		reject()
		// 	}
		// })
	})
}
