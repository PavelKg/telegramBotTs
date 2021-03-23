"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./app/utils/config");
const app_1 = __importDefault(require("./app"));
const server = fastify_1.default({
    logger: true,
    ignoreTrailingSlash: true,
    bodyLimit: 7291456
});
server.register(app_1.default).then(() => { });
server.listen(config_1.PORT || 8765, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
