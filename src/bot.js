// ESModule | TypeScript
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';
import { config } from '../config/config.js';

// 创建 client
const client = createOpenAPI(config.bot);

const ws = createWebsocket(config.bot);
ws.on('READY', data => {
  console.log('[READY] 事件接收 :', data);
});
ws.on('ERROR', data => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', data => {
  console.log('[GUILDS] 事件接收 :', data);
});
ws.on('GUILD_MEMBERS', data => {
  console.log('[GUILD_MEMBERS] 事件接收 :', data);
});
ws.on('GUILD_MESSAGES', data => {
  console.log('[GUILD_MESSAGES] 事件接收 :', data);
});
ws.on('GUILD_MESSAGE_REACTIONS', data => {
  console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
});
ws.on('DIRECT_MESSAGE', data => {
  console.log('[DIRECT_MESSAGE] 事件接收 :', data);
});
ws.on('INTERACTION',data => {
  console.log('[INTERACTION] 事件接收 :', data);
});
ws.on('MESSAGE_AUDIT', data => {
  console.log('[MESSAGE_AUDIT] 事件接收 :', data);
});
ws.on('FORUMS_EVENT', data => {
  console.log('[FORUMS_EVENT] 事件接收 :', data);
});
ws.on('AUDIO_ACTION', data => {
  console.log('[AUDIO_ACTION] 事件接收 :', data);
});
ws.on('PUBLIC_GUILD_MESSAGES', data => {
  console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', data);
});


// 机器人信息
async function botInfo() {
    let { data } = await client.meApi.me();
    console.log(data);
}

// 获取频道列表
async function getGuilds() {
    let {data} = await client.meApi.meGuilds();
    console.log(data);
}

// 获取子频道列表
async function getChildrenGuilds(guildId) {
    let {data} = await client.channelApi.channels(guildId);
    console.log(data);
}
botInfo()
getGuilds()
getChildrenGuilds("15465803430804453911")

let getClientIp = function (req) {
  return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
};


// 主动灌水
/* client.messageApi.postMessage("9327706", {
    content: 'messageApi接口触发： 诗酒趁年华',
    // 带有 msgId 标识为被动消息
    msg_id: new Date(),
    }).then(res => {
    // 数据存储在data中
    console.log(res.data);
    }).catch(err => {
    // err信息错误码请参考API文档错误码描述
    console.log(err);
}) */
  
// at 机器人消息事件
ws.on("PUBLIC_GUILD_MESSAGES", dc => {
    const content = dc.msg.content;
    if (content.includes('hello')) {
        client.messageApi.postMessage(dc.msg.channel_id, { content: '你好' }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    } 
});

console.log("客户端地址：", getClientIp);

let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
console.log(ip);
ip = ip ? ip.join('.') : null;
console.log(ip);