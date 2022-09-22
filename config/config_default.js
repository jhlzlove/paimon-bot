let config = {
    bot: {
        appID: '12345678', // 申请机器人时获取到的机器人 BotAppID
        token: 'BotToken', // 申请机器人时获取到的机器人 BotToken
        // 事件订阅,用于开启可接收的消息类型GUILDS，PUBLIC_GUILD_MESSAGES，DIRECT_MESSAGE，GUILD_MEMBERS
        intents: [], // ['PUBLIC_GUILD_MESSAGES'], 空数组开启所有消息的监听
        sandbox: false, // 沙箱支持（即测试环境开放Api），可选，默认false. v2.7.0+
    },
    // 聚合天气 key：https://www.juhe.cn/ 官网申请，也可以用其它的 API
    weatherKey: '',
  };

export {config}