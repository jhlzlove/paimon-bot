import YAML from 'yaml';
import fs from 'fs';
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

// 解析 yml 文件
let configPath = fs.readFileSync("../../config/config.yml", "UTF-8")
let config = YAML.parse(configPath)

// 打印配置
console.log(config);
console.log(config.bot);

const client = createOpenAPI(config.bot);
const ws = createWebsocket(config.bot);

let user = await client.meApi.me();

console.log(user);