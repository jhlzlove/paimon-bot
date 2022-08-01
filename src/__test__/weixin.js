import fetch, { Headers } from 'node-fetch'

// 请求头
let header = {
    "host": "mp.weixin.qq.com",
    "Refener": "https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=9&createType=0&token=329128152&lang=zh_CN",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77"
}
// https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&isNew=1&type=77&createType=0&token=329128152&lang=zh_CN
let cookie = "RK=9H8McK3hZW; ptcz=ef6f5776b6c8dd2840f58dacca7c3278cbc6d19c9b7ef150b41963f33662de2e; pgv_pvid=2661028740; rewardsn=; wxtokenkey=777; ua_id=7XZcksabD68BdgMeAAAAAKl2SR2X-p7WTVrYN9SHSGs=; wxuin=59245373592318; mm_lang=zh_CN; uuid=339742b2ffda6e7ee2e5f7ef331da28a; rand_info=CAESIAxVYezsQR+37/ZJdeSgV0k0gJ2YO6M5MiQDC9fMTEhM; slave_bizuin=3204712314; data_bizuin=3204712314; bizuin=3204712314; data_ticket=F5VQCtPjsxv3uaNQpNM+Ent2sosU/3uXamhVhdSAoSXTk9AZhQnFPJ+Ymw8locCZ; slave_sid=QTlPRlQ2cGpodUo2MDNpQzl4YXNfdWJSZldJVHBNUkZ0b05nblhpTWNJcVBobjRkdnc0X3gwNU1IVXYxTWJHcWc4Q3d3QVFwMjhLQTZUa2RnZUVZNEtsbmVoRVk5Z2hnZklRWkNoalI4UkVENkNxVUJRckN4T2pkZlo2SkFQTHVGemxoVkU0V0w0N0hzUDN1; slave_user=gh_6171ae987dd8; xid=eced51c3574572da8f2fc8a48616d544; _clck=3204712314|1|f3m|0"
// 自己的 fakeid
let fakeid = "MjM5MTA3NTQwNQ=="
let url = "https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&begin=0&count=5&fakeid=" + fakeid + "&type=9&query=&token=329128152&lang=zh_CN&f=json&ajax=1"


let res = await fetch("https://mp.weixin.qq.com", {'headers': {'cookie': cookie}})

let m = await res.text()
console.log(m);