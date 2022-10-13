// ESModule | TypeScript
import setLog from './src/log/log.js';
import { load } from './src/login/login.js';
import { listener } from './src/task/websocket.js';

setLog()

load()

listener()

