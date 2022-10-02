import { config } from "../../config/config.js";

/**
 * 程序调用的 API 全部放这里
 */
export default {
    // 新闻 API
    API_NEWS: "http://118.31.18.68:8080/news/api/news-file/get",

    // ##################### https://wx.jdcloud.com/api/0_0/1 #######################
    // 天气查询 API
    API_WEATHER: `https://way.jd.com/jisuapi/weather?appkey=${config.JD_API_KEY}&city=`,
    // 收集归属地 API
    API_PHONE: `https://way.jd.com/jisuapi/query4?appkey=${config.JD_API_KEY}&shouji=`,
    
}