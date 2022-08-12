// ESModule | TypeScript
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';
import lodash from 'lodash'
import { config } from '../config/config.js';
import  schedule  from 'node-schedule';
import fetch from 'node-fetch';

// 创建 client
const client = createOpenAPI(config.bot);

const ws = createWebsocket(config.bot);

// 频道信息
let guildMap = new Map()
// 子频道信息
let channelMap = new Map()
// 频道成员
let memberMap = new Map()
// 频道机器人
let botCount = 0
let memberCount = 0

async function load() {
  // 机器人信息
  let user = await client.meApi.me();
  console.log(`================ ${user.data.username} 上线成功！！！===============`);
  console.log(`=================== 正在加载信息，请稍后...... ======================`);


  // 频道信息
  let guild = await client.meApi.meGuilds();
  let guildData = guild.data

  // 获取频道以及子频道
  for (let i = 0; i < guildData.length; i++) {
    // 键：guildId    值：guildName
    guildMap.set(guildData[i].id, guildData[i].name)

    /* 子频道 */
    let channels = await client.channelApi.channels(guildData[i].id)
    let channelData = channels.data
    console.log(channelData);
    for (let j = 0; j < channelData.length; j++) {
      // 键：channelId    值：channelName
      channelMap.set(channelData[j].id, channelData[j].name)
    }

    // 频道成员列表
    let members = await client.guildApi.guildMembers(guildData[i].id, {limit: 1000});
    let memberData = members.data
    // console.log(memberData);
    for (let k = 0; k < memberData.length; k++) {
      if (memberData[k].user.bot) {
        botCount++
      } else {
        // 键：user.id   值：member
        // memberMap.set(memberData[k].user.id, memberData[k])
        memberCount++
      }
      
    }

  }

  
  console.log(`======== 加载了 ${guildMap.size} 个频道，${channelMap.size} 个子频道 =========`);
  console.log(`======== 加载了 ${memberCount} 个成员，${botCount} 个机器人 =========`);


  console.log(`============================= 加载完毕！ ============================`);
}

load()

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

let subChannelId
// 私域消息事件
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

  schedule.scheduleJob("0 02 19 * * ?", () => {
    // 定时任务发送
    if (subChannelId) {
      // 获取信息
      fetch("http://api.2xb.cn/zaob").then((res) => {
        res.json().then(res => {
          imageUrl = res.imageUrl
        })
        }).catch((err) => {
          console.log(err);
        })
        // 发送
        client.messageApi.postMessage(subChannelId, {content: content})
        .then(res => {
        console.log(res);
        }).catch(err => {console.log(err);})
    }
  })
  
  
  
  console.log('私域机器人全部消息 事件接收 :', data);
   // 监听到接收的消息
 /*  if (data.eventType === 'MESSAGE_CREATE') {
    
    client.messageApi.postMessage(msg.channel_id, {content: "还不滚去学习"})
    .then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }) 
  }*/
});

ws.on('GUILD_MESSAGE_REACTIONS', data => {
  console.log('消息表情事件 事件接收 :', data);
});

ws.on('DIRECT_MESSAGE', data => {
  console.log('私信机器人 事件接收 :', data);
});

ws.on('INTERACTION',data => {
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
// 上线消息
// ws.on('READY', data => {
//   console.log('[READY] 事件接收 :', data);
// });
ws.on('ERROR', data => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', data => {
  console.log('[频道/子频道] 事件接收 :', data);
});


ws.on('GUILD_MEMBERS', data => {
  console.log('[频道成员] 事件接收 :', data);
  // if (data.eventType === 'GUILD_MEMBER_ADD') {
  //   client.messageApi.postMessage(data.msg.guildId)
  // }
});