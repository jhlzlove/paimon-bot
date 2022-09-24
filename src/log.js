import log4js from "log4js"

class Log {
    /** 日志 */
    setLog() {
        log4js.configure({
            appenders: {
                // 设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
                out: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '[%d{hh:mm:ss.SSS}][%[%5.5p%]] - %m'
                    }
                }
            },
            // 不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
            categories: {
                // appenders:采用的appender,取上面appenders项,level:设置级别
                default: { appenders: ['out'], level: 'debug' }
            }
        })
        global.logger = log4js.getLogger('[test]')
        logger.level = 'debug'
    }
}

export default new Log