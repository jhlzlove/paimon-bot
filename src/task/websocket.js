import { client, ws } from "../login/client.js"
import schedule from "node-schedule";
import { postHitokoto, postNeteaseHotReview, postWeather } from "./search.js";

export async function listener() {
    /**
     * online message
     */
    ws.on('READY', data => {
        console.log('[READY] 事件接收 :', data);
    });

    /**
     * 私域消息事件处理
     */
    ws.on('GUILD_MESSAGES', data => {

        let msg = data.msg

        // 撤掉信息
        if (msg.content && msg.content.includes("lsp")) {
            /**
             * @params1 channelID 子频道id
             * @params2 messageID 消息id
             * @params3 hideTip 是否隐藏撤回灰度条：true ？ 隐藏 : 显示，默认显示(false)
             * @description: 违规消息撤掉之后不用触发后面的回复
            */
            client.messageApi.deleteMessage(msg.channel_id, msg.id, false)
                .then((res) => {
                    console.log(`<${msg.author.username}> 的违规消息：“${msg.content}” 已被撤回`);
                })
                .catch((err) => {
                    console.log(err);
                })
            return
        }

        if (msg.content.includes("网易云热评")) {
            postNeteaseHotReview()
                .then((res) => {
                    client.messageApi.postMessage("9444867", {
                        content: res
                    })
                })
        }

        if (msg.content.includes("一言")) {
            postHitokoto()
                .then((res) => {
                    client.messageApi.postMessage("9444867", {
                        content: res
                    })
                })
        }
        
        if (msg.content.includes("天气")) {
            let city = msg.content.replace("天气", "")
            postWeather(city)
                .then((res) => {
                    client.messageApi.postMessage("9444867", {
                        content: res
                    })
                })
                .catch((err) => {
                    console.error("请求失败", err);
                })
        }


        // 定时任务
        schedule.scheduleJob("0 0 8 * * ?", async () => {
            let weather = await postWeather("南京")
            await client.messageApi.postMessage("9444867", {
                content: weather
            })
        })

        schedule.scheduleJob("0 0 7 * * ?", async () => {
            let hitokoto = await postHitokoto()
            await client.messageApi.postMessage("9444867", {
                content: hitokoto
            })
        })

        // 1	全体成员
        // 2	管理员
        // 4	群主/创建者
        // 5	子频道管理员
        // 身分组 ID

        console.log('私域机器人全部消息 事件接收 :', data);
    });

    /**
     * 频道成员信息
     */
    ws.on('GUILD_MEMBERS', data => {
        console.log('[频道成员] 事件接收 :', data);
        const user = data.d.user
        if (user.bot) {
            return
        }
        // 消息模板
        let welcomeTemplete = `欢迎 ${user.username} 旅行者加入提瓦特，${user.avatar}`
        // 新成员加入
        if (data.eventType === 'GUILD_MEMBER_ADD') {
            client.messageApi.postMessage(data.msg.channel_id, { content: welcomeTemplete })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        }
    });
}
