/** 基本测试类 */
import fetch from "node-fetch";
import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import { config } from "../../config/config.js";
// import { schedule } from "node-schedule";
import api from "../constants/api.js";
import { weatherPrediction } from "../task/schedule.js";
import Log from '../log.js';

console.log(path.sep);
let __dirname = fileURLToPath(import.meta.url)
__dirname = path.dirname(__dirname)

Log.setLog()
logger.debug("诗酒趁年华")
// schedule.scheduleJob("0 30 10 * * ?", async () => {

//     let url = `http://apis.juhe.cn/simpleWeather/query?city=南京&key=${config.weatherKey}`
//     console.log(url);

//     let res = await fetch(url)
//     console.log(res);
//     let json = await res.json()
//     console.log(json);
//     console.log(json.result);
// })

console.log(process.cwd());
let res = await weatherPrediction("郑州")
console.log(res);
/* 
值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。

引用数据类型（对象类型）：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。
*/
function testBasic() {
    let arr = [
        '风中捉刀', '荻花题叶', '玲珑雪霏', "无情葬月"
    ];
    console.log(arr);

    const user = {
        first: "c",
        second: "lf",
        role: "admin"
    };
    console.log(user.first);
}

/** 嵌入语法 */
function testTemplateSyntax() {
    let username = "jhlz"
    let avatar = "hha"
    let welcomeTemplete = `欢迎 ${username} 旅行者加入提瓦特，${avatar}`
    console.log(welcomeTemplete);
}

/** 测试 Map */
function testMap() {
    let map = new Map()
    map.set('旺财', '风中捉刀')
    map.set('昊辰', '荻花题叶')
    map.set('盈曦', '玲珑雪霏')
    map.set('飞凕', '无情葬月')

    // 三个参数，值：键：源数据
    map.forEach((v, k, m) => {
        // console.log(m);
        console.log(`${k} : ${v}`);
    })

    console.log("clear() 之前map：", map);
    map.clear();
    console.log("clear() 之后map：", map);
}