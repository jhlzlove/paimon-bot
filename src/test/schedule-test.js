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

let imageUrl
function task() {
    schedule.scheduleJob("0 05 19 * * ?", () => {
      fetch("http://api.2xb.cn/zaob").then((res) => {
        let json = res.json().then(res => {console.log(res.imageUrl);})
        console.log(json.imageUrl);
      }).catch((err) => {
        console.log(err);
      })
    })
    return imageUrl
  }

  console.log(task());



