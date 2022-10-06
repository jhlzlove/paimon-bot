// appid: 20220130001071339
// secretkey: Zp_pGQHkvpdLBRR8xXNC

import { config } from "../../config/config.js";
import api from "../constants/api.js";
import fetch from 'node-fetch';
import md5 from 'md5';

/**
 *  q	string	是	请求翻译query	UTF-8编码
    from	string	是	翻译源语言	可设置为auto
    to	string	是	翻译目标语言	不可设置为auto
    appid	string	是	APPID	可在管理控制台查看
    salt	string	是	随机数	可为字母或数字的字符串
    sign	string	是	签名	appid+q+salt+密钥的MD5值
 */
class Translate{
    constructor() {
        
    }
    
    async translate(query) {
        if (query.match("[\u4e00-\u9fa5]")) {
            return this.postTranslateZhtoEn(query)
        } else {
            return this.postTranslateEntoZh(query)
        }
    }

    /**
     * 中 --> 英
     * @param {待翻译的字符串} query 
     * @returns 
     */
    async postTranslateZhtoEn(query) {
        return this.postTranslate(query, "zh", "en")
    }

    /**
     * 英 --> 中
     * @param {待翻译的英文} query 
     * @returns 
     */
    async postTranslateEntoZh(query) {
        return this.postTranslate(query, "en", "zh")
    }

    async postTranslate(query, from, to) {

        const appid = config.baidu_trans_appid
        const secretkey = config.baidu_trans_secretkey
        if (!appid || !secretkey) {
            console.log(`百度翻译的 appid、secret 未正确配置！`);
            return
        }

        // sign 生成格式：appid=2015063000000001+q=apple+salt=1435660288+密钥=12345678
        // 随机盐
        let salt = new Date().getTime()
        // 组装 sign 字符串
        let signStr = appid + query + salt + secretkey
        // 生成 sign
        let sign = md5(signStr)
        // request url
        let url = api.API_TRANSLATE_BAIDU + "?q=" + query + "&from=" + from + "&to=" + to + 
                    "&appid=" + appid + "&salt=" + salt + "&sign=" + sign

        // request
        let res = await fetch(url)
        let json = await res.json()

        let result = "原: " + json.trans_result[0].src + 
                     "\n译: " + json.trans_result[0].dst
        return result
    }
}

export default new  Translate()