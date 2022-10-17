import fs from 'node:fs';
import constants from '../constants/constants.js';
import YAML from 'yaml';
import inquirer from 'inquirer'
import path from 'node:path';

class Check {

    async loadConfig() {
        const configDefault = "../../config/config_default.yml"
        const fileDef = constants.BOT_CONFIG_YAML_PATH
        if (!fs.existsSync(fileDef)) {
            fs.mkdirSync(path.dirname(fileDef))
            fs.copyFileSync(configDefault, fileDef)

            let properties = [
                {
                    type: 'Input',
                    message: '请输入 QQ 频道的 BotAppID',
                    name: 'appID'
                },
                {
                    type: 'Input',
                    message: '请输入 QQ 频道机器人的 BotToken',
                    name: 'token'
                }
            ]

            let ret = await inquirer.prompt(properties)
            let botInfo = fs.readFileSync(fileDef, 'utf-8')

            botInfo = botInfo.replace(/appID:/g, 'appID: ' + ret.appID)
            botInfo = botInfo.replace(/token:/g, 'token: ' + ret.token)

            let bot = fs.writeFileSync(fileDef, botInfo,'utf-8')
            
        } else {
            let configPath = fs.readFileSync(constants.BOT_CONFIG_YAML_PATH, "utf-8")
            let config = YAML.parse(configPath)
            return config
        }
    }


}

let c = new Check()
c.loadConfig()