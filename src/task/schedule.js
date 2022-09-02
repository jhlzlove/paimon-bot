import fetch from "node-fetch"
import fs, { createWriteStream } from "fs"
import { fileURLToPath } from "url"
import path from "path"
import { pipeline } from "stream"
import { promisify } from "util"
import schedule from "node-schedule";


let __dirname = fileURLToPath(import.meta.url)
__dirname = path.dirname(__dirname)

// 新闻接口 http://api.2xb.cn/zaob 
let newsUrl = "http://118.31.18.68:8080/news/api/news-file/get";

const streamPipeline = promisify(pipeline);

async function task01() {
    schedule.scheduleJob("0 50 13 * * ?", () => {
        /** 获取新闻图片地址 */
        let res = await fetch(newsUrl);
        let json = await res.json()
        const imageUrl = json.result.data
        const imgRes = await fetch(imageUrl);

        let savePath = "../resources/images";
        if (!fs.existsSync(path.dirname(savePath))) {
            fs.mkdirSync(parentPath, { recursive: true });
        }

        /** 下载保存 */
        streamPipeline(imgRes.body,
            createWriteStream(savePath + path.sep + new Date().getTime() + ".png"))
        return imageUrl
    })
}

export {task01}
