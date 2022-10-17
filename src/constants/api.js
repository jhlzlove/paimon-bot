import { config } from "../login/init.js";

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
    API_WEATHER: `https://way.jd.com/jisuapi/weather?appkey=${config.jd_api_key}&city=`,
    // 手机号归属地 API
    API_PHONE: `https://way.jd.com/jisuapi/query4?appkey=${config.jd_api_key}&shouji=`,

    // ################################## 百度翻译 ##############################
    API_TRANSLATE_BAIDU: `https://fanyi-api.baidu.com/api/trans/vip/translate`

    // ################ https://api.yonyoucloud.com/apilink/#/api ##################
}