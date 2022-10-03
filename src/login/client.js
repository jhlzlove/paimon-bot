import { config } from '../../config/config.js';
import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

// create client ws
const client = createOpenAPI(config.bot);
const ws = createWebsocket(config.bot);

// export
export {client, ws}
