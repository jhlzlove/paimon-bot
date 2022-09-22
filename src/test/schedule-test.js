import schedule from 'node-schedule'
import fetch from "node-fetch";

/* 定时任务 */
// function scheduleCronstyle(){
//     let imageUrl
//     // 秒 分钟 时 天 周
//     schedule.scheduleJob('10 * * * * ?', () => {
//         fetch("http://api.2xb.cn/zaob").then((res) => {
//             console.log(res.json());
//             imageUrl = res.imageUrl
//             console.log(imageUrl.lastIndexOf("_"));


//         }).catch((err) => {
//             console.log(err);
//         })
//     });
// }

// 调用
// scheduleCronstyle();

async function task() {
  schedule.scheduleJob("0 11 9 * * ?", async () => {
    let res = await fetch("http://api.2xb.cn/zaob")
    let json = await res.json()
    console.log(json.imageUrl);

    return json.imageUrl
  })
}

task()
