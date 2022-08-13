import { config } from '../config/config.js';
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

// 创建 client
const client = createOpenAPI(config.bot);

const ws = createWebsocket(config.bot);

export default {client, ws}