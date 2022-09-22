/**
 * @author jhlz
 * @description: 一款优秀的机器人应该会自动的处理一些任务
 * @date: 2022-09-22 11:13:34
 */
import fetch from "node-fetch"
import fs, { createWriteStream } from "fs"
import path from "path"
import { pipeline } from "stream"
import { promisify } from "util"
import schedule from "node-schedule";
import dayjs from "dayjs"
import constants from "../constants/constants.js"
import { config } from "../../config/config.js"
import api from "../constants/api.js"

/**
 * 9:00 新闻
 */
export async function getNewsImg() {
    schedule.scheduleJob("0 0 9 * * ?", async () => {
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
        streamPipeline(downloadPath.body,
            createWriteStream(constants.NEWS_SAVE_PATH + path.sep + dayjs().format("YYYYMMDDHHmmss") + ".png"))
        return imageUrl
    })
}

/**
 * 8:00 天气预报 默认查询郑州
 */
export async function weatherPrediction(city = "郑州") {
    schedule.scheduleJob("0 0 8 * * ?", async () => {
        if (!config.weatherKey) {
            console.log(`聚合天气的 key 为空`);
            return
        }

        let url = api.API_WEATHER + city + "&key=" + config.weatherKey
        let res = await fetch(url)
        let json = await res.json()
        console.log(json.result);
    })
}
