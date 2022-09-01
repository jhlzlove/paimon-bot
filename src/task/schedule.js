import schedule from 'node-schedule';
import fetch from 'node-fetch';
import fs from 'fs'
import  progressStream from 'progress-stream'

let newsUrl = "http://118.31.18.68:8080/news/api/news-file/get";

export function getNews() {
    schedule.scheduleJob("0 08 19 * * ?", () => {
        // 获取信息
        let res = fetch(newsUrl)
            .then((res) => {
                res.json().then((r) => {
                    console.log(r.result.data);
                    
                    // 下载图片
                    downloadImage(r);



                })
            }).catch((err) => {
                console.log(err);
            })

    })
    return "获取新闻 data 失败"
}
// 调用
getNews()

function downloadImage(r) {
    const fileStream1 = fs.createWriteStream(process.cwd() + "/" + new Date().getTime() + ".png").on('error', function (e) {
        console.error('错误', e);
    }).on('ready', function () {
        console.log("开始下载:");
    }).on('finish', function () {
        console.log('文件下载完成:');
    });
    fetch(r.result.data, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
    }).then(res => {
        /* 获取请求头中的文件大小数据 */
        let length = res.headers.get("content-length");
        /* 创建进度 */
        let str = progressStream({
            length, time: 100
        });
        str.on('progress', function (progressData) {
            let percentage = Math.round(progressData.percentage) + '%';
            console.log(percentage);
        });
        res.body.pipe(str).pipe(fileStream1);
    }).catch(e => {
        //自定义异常处理
        console.log(e);
    });
}
