"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./app/utils/config");
const fastify_1 = __importDefault(require("fastify"));
const config_2 = require("./app/utils/config");
const app_1 = __importDefault(require("./app"));
const https = {
    key: fs_1.default.readFileSync('ssl_keys/privkey.pem'),
    cert: fs_1.default.readFileSync('ssl_keys/fullchain.pem')
};
const add_opt = config_1.SERVER_TYPE === 'https' ? { https } : {};
const server = fastify_1.default(Object.assign(Object.assign({}, add_opt), { logger: true, ignoreTrailingSlash: true, bodyLimit: 7291456 }));
server.register(app_1.default).then(() => { });
server.listen(config_2.PORT || 8765, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
