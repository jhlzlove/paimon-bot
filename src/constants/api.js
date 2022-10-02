import { config } from "../../config/config.js";

/**
 * 程序调用的 API 全部放这里
 */
export default {
    // Hitokoto 一言 API
    API_HITOKOTO: "https://v1.hitokoto.cn/",
    // 新闻 API
    API_NEWS: "http://118.31.18.68:8080/news/api/news-file/get",
    // 网易云热评 使用 json 格式的话改为 https://xxx/aa1=json
    API_NETEASE_HOT_REVIEW: "https://v.api.aa1.cn/api/api-wenan-wangyiyunreping/index.php?aa1=text",

    // ##################### https://wx.jdcloud.com/api/0_0/1 #######################
    // 天气查询 API
    API_WEATHER: `https://way.jd.com/jisuapi/weather?appkey=${config.JD_API_KEY}&city=`,
    // 收集归属地 API
    API_PHONE: `https://way.jd.com/jisuapi/query4?appkey=${config.JD_API_KEY}&shouji=`,
    
}