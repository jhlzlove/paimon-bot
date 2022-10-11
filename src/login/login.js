/**
 * @author jhlz
 * @description: 登录
 * @date: 2022-09-22 11:14:47
 */
import { client } from './init.js';

// 频道信息
let guildMap = new Map()
// 子频道信息
let channelMap = new Map()
// 频道机器人
let botCount = 0
// 成员
let memberCount = 0

export async function load() {
    // 机器人信息
    let user = await client.meApi.me();
    logger.info(`================ ${user.data.username} 上线成功！！！===============`);
    logger.info(`=================== 正在加载信息，请稍后...... ======================`);

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
        let members = await client.guildApi.guildMembers(guildData[i].id, { limit: 1000 });
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
