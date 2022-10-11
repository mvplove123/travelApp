export default {
	
	
	 queryCityList : "travel/r/queryArriveCityList",
	
	
	web_name: "网站名称", 
	
	uni_app_web_url: "https://travelprogrammer.com/", // h5域名PC域名，用于分享图片或者拼接图片时使用，结尾必须加 “/”
	
	//#ifdef H5
	uni_app_web_api_url:"/api/",
	//#endif
	
	//#ifndef H5
	uni_app_web_api_url: "https://travelprogrammer.com/", // 请求接口的地址
	//#endif
	debug: true
}
