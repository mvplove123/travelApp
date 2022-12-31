export default {

	queryConfig: "/travel/config/queryConfig",


    queryCityList: "travel/r/queryArriveCityList",

    queryCityInfo: "travel/r/queryCityDetail",

    queryCityStationList: "travel/r/queryCityStationList",

    queryOpenId: "/travel/wx/queryOpenId",

    wxLogin: "/travel/wx/login",

    wxUserSave: "/travel/wx/updateUserInfo",

    addFeedBack:"/travel/wx/addFeedBack",

    uploadPath: "https://up-z1.qiniup.com",


    web_name: "网站名称",

    uni_app_web_url: "https://travelprogrammer.com/", // h5域名PC域名，用于分享图片或者拼接图片时使用，结尾必须加 “/”

    file_app_web_url:"https://file.travelprogrammer.com/", // 文件域名，用于拼接图片时使用

    //#ifdef H5
    uni_app_web_api_url: "/api/",
    //#endif

    //#ifndef H5
    uni_app_web_api_url: "https://travelprogrammer.com/", // 请求接口的地址
    //#endif
    debug: true
}
