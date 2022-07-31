// ESModule | TypeScript
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';
import lodash from 'lodash'
import { config } from '../config/config.js';

// 创建 client
const client = createOpenAPI(config.bot);

const ws = createWebsocket(config.bot);

// 频道信息
let guildMap = new Map()
// 子频道信息
let channelMap = new Map()
// TODO 频道成员

async function load() {
  // 机器人信息
  let user = await client.meApi.me();

  // 频道信息
  let guild = await client.meApi.meGuilds();
  let guildData = guild.data

  // 循环获取频道以及子频道
  for (let i = 0; i < guildData.length; i++) {
    // 键：guildId    值：guildName
    guildMap.set(guildData[i].id, guildData[i].name)

    /* 子频道 */
    let channels = await client.channelApi.channels(guildData[i].id)
    let channelData = channels.data
    for (let j = 0; j < channelData.length; j++) {
      // 键：channelId    值：channelName
      channelMap.set(channelData[j].id, channelData[j].name)
    }
  }

  console.log(`================ ${user.data.username} 上线成功！！！===============`);
  console.log(`=================== 正在加载信息，请稍后...... ======================`);
  console.log(`======== 加载了 ${guildMap.size} 个频道，${channelMap.size} 个子频道 =========`);
  console.log(`============================= 加载完毕！ ============================`);
}

load()

// at 机器人消息事件
ws.on("PUBLIC_GUILD_MESSAGES", dc => {
    const content = dc.msg.content;
    if (content.includes('hello')) {
        client.messageApi.postMessage(dc.msg.channel_id, { content: '你好，我叫派蒙' }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    } 
});

// 上线消息
// ws.on('READY', data => {
//   console.log('[READY] 事件接收 :', data);
// });
ws.on('ERROR', data => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', data => {
  console.log('[GUILDS] 事件接收 :', data);
});
ws.on('GUILD_MEMBERS', data => {
  console.log('[GUILD_MEMBERS] 事件接收 :', data);
  // if (data.eventType === 'GUILD_MEMBER_ADD') {
  //   client.messageApi.postMessage(data.msg.guildId)
  // }
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
