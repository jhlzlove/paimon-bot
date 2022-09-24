// ESModule | TypeScript
import log from './src/log.js';
import { load } from './src/login.js';
import { listener } from './src/websocket.js';

log.setLog()

load()

listener()
