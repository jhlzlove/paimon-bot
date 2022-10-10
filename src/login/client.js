import { createOpenAPI, createWebsocket } from 'qq-guild-bot';
import fs from 'node:fs';
import constants from '../constants/constants.js';
import YAML from 'yaml';

// parse config
let configPath = fs.readFileSync(constants.BOT_CONFIG_YAML_PATH, "utf-8")
let config = YAML.parse(configPath)

// create client ws
const client = createOpenAPI(config.bot);
const ws = createWebsocket(config.bot);

// export
export {config, client, ws}
