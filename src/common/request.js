import config from "@/common/config.js";  // 配置文件
import storage from "./storage"; // 缓存封装

export default {
	console(options){
		if(config.debug){
			console.log("<<===============================================>>");
			console.log("request start");
			console.log("header" + JSON.stringify(options.header));
			console.log("method: " + options.method + " URL: " + options.url);
			console.log(options.data);
			console.log("request end");
			console.log("<<===============================================>>");
		} 
	},
	domain(){
		return config.uni_app_web_api_url.replace("api","");
	},
	send(options={}){
        // 拼接路径，下面的配置文件会提到
		options.url = config.uni_app_web_api_url + '' + options.url;
        // 请求方式
		options.method = options.method || "GET";
		
        // 这里看项目的情况来定，如果是没有token，那就删除这里，上面的storage也不需要引入
		let users = storage.getJson("users");
		if(users != null){
			options.header = { "Auth-Token" : users.token };
		}
		
		this.console(options);  // 打印请求数据，调试用，上线可以注释
        
        // 发起Promise请求
		return new Promise((resolve, reject) =>{
			uni.request(options).then(data=>{
				var [error, res] = data;
				console.log(data)
				if(error != null){
					reject(error);
				}else{
                    // 相应拦截、根据后端的状态码来写，可以自行判断和封装
					if(res.data.status == '-1001'){
						uni.hideLoading();
						uni.navigateTo({
						    url: '/pages/Login/login/login'
						});
					}else{
						resolve(res.data); 
					}
				}
			});
		});
	},
	get(url="",data={}){
		return this.send({
			url: url,
			data: data
		});
	},
	post(url="",data={}){
		return this.send({
			url: url,
			data: data,
			method: "POST"
		});
	}
};
