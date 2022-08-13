import schedule from 'node-schedule';
import fetch from 'node-fetch';

export function getNews() {
    schedule.scheduleJob("0 22 9 * * ?", () => {

        // 获取信息
        let res = fetch("http://api.2xb.cn/zaob")
            .then((res) => {
                res.json()
            }).catch((err) => {
                console.log(err);
            })
    })
    return "获取新闻 data 失败"
}