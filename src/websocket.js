import { ws } from "./client.js"

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

    subChannelId = data.msg.channel_id

    let msg = data.msg
    // 撤掉信息
    if (msg.content.includes("lsp")) {
        /**
         * @params1 channelID 子频道id
         * @params2 messageID 消息id
         * @params3 hideTip 是否隐藏撤回灰度条：true ？ 隐藏 : 显示，默认显示(false)
         * @description: 违规消息撤掉之后不用触发后面的回复
        */
        client.messageApi.deleteMessage(msg.channel_id, msg.id, false)
            .then((res) => {
                console.log(`<${msg.author.username}> 的违规消息：“${msg.content}” 已被撤回`);
            }).catch((err) => {
                console.log(err);
            })
        return
    }


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

ws.on('GUILDS', data => {
    console.log('[频道/子频道] 事件接收 :', data);
});

// ################################### 以下事件先不考虑 ###################################

/**
 * PUBLIC_GUILD_MESSAGES (1 << 30) 公域的消息事件
 * AT_MESSAGE_CREATE      当收到@机器人的消息时
 * PUBLIC_MESSAGE_DELETE  当频道的消息被删除时
 */
 ws.on("PUBLIC_GUILD_MESSAGES", dc => {
    const content = dc.msg.content;

    // @ 机器人的消息
    if (dc.eventType === 'AT_MESSAGE_CREATE') {
        if (content.includes('hello')) {
            client.messageApi.postMessage(dc.msg.channel_id, { content: '你好，我是正在开发中的机器人' }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
});

ws.on('GUILD_MESSAGE_REACTIONS', data => {
    console.log('消息表情事件 事件接收 :', data);
});

ws.on('DIRECT_MESSAGE', data => {
    console.log('私信机器人 事件接收 :', data);
});

ws.on('INTERACTION', data => {
    console.log('互动 事件接收 :', data);
});
ws.on('MESSAGE_AUDIT', data => {
    console.log('消息审核 事件接收 :', data);
});
ws.on('FORUMS_EVENT', data => {
    console.log('[私域论坛事件] 事件接收 :', data);
});
ws.on('AUDIO_ACTION', data => {
    console.log('[音频事件] 事件接收 :', data);
});

ws.on('ERROR', data => {
    console.log('[ERROR] 事件接收 :', data);
});