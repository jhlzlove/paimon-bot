/**
 * @author jhlz
 * @description: API 查询
 * @date: 2022-10-02 16:56:25
 */
 import fetch from "node-fetch"
 import fs, { createWriteStream } from "fs"
 import path from "path"
 import { pipeline } from "stream"
 import { promisify } from "util"
 import dayjs from "dayjs"
 import constants from "../constants/constants.js"
 import api from "../constants/api.js"

/**
 * 天气预报
 * @param {city} 城市名称
 * @returns 城市天气状况
 */
export async function postWeather(city) {
    if (!city) {
        logger.error("获取天气信息的城市为空")
        return
    }
    let url = api.API_WEATHER + city
    let res = await fetch(url)
    let json = await res.json()

    let result = json.result.result
    let temeplate = "城市: " + result.city +
                    "\n状态: " + result.weather + 
                    "\n最高温度: " + result.temphigh + "°C" +
                    "\n最低温度: " + result.templow + "°C" +
                    "\n湿度: " + result.humidity + 
                    "\n气压: " + result.pressure + 
                    "\n风速: " + result.windspeed + 
                    "\n风力: " + result.winddirect + result.windpower + 
                    "\n最近更新: " + result.updatetime +
                    "\npm2.5: " + result.aqi.pm2_5 +
                    "\n空气质量: " + result.aqi.quality +
                    "\n说明: " + result.aqi.aqiinfo.affect +
                    result.index[0].iname + ": " + result.index[0].ivalue + "\n" + 
                    result.index[1].iname + ": " + result.index[1].ivalue + "\n" + 
                    result.index[2].iname + ": " + result.index[2].ivalue + "\n" + 
                    result.index[3].iname + ": " + result.index[3].ivalue + "\n" + 
                    result.index[4].iname + ": " + result.index[4].ivalue + "\n" + 
                    result.index[5].iname + ": " + result.index[5].ivalue
    return temeplate
}

/**
 * 手机号归属地
 * @param {phone} 手机号
 * @returns 查询结果
 */
export async function postPhone(phone) {
    if (!phone) {
        logger.error("手机号为空！！！")
        return
    }
    let url = api.API_PHONE + phone
    let res = await fetch(url)
    let json = await res.json()
    let temeplate = "查询结果：\n手机号: " + json.result.result.shouji +
                "\n归属地: " + json.result.result.province + json.result.result.city + 
                "\n运营商: " + json.result.result.company + 
                "\n区号: " + json.result.result.areacode
    return temeplate
}

/**
 * 新闻
 * @returns 下载路径
 */
 export async function postNewsImg() {
    /** 调用 API 获取新闻图片下载链接 */
    let res = await fetch(api.API_NEWS);
    let json = await res.json()
    const imageUrl = json.result.data
    const downloadPath = await fetch(imageUrl);

    // if not exist file folder, create it
    if (!fs.existsSync(constants.NEWS_SAVE_PATH)) {
        fs.mkdirSync(constants.NEWS_SAVE_PATH, { recursive: true });
    }

    /** 下载保存 */
    const streamPipeline = promisify(pipeline);
    let filePath = constants.NEWS_SAVE_PATH + path.sep + dayjs().format("YYYYMMDDHHmmss") + ".png"
    streamPipeline(downloadPath.body, createWriteStream(filePath))
    return filePath
}
