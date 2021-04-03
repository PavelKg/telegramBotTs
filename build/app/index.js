'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const crypto_1 = __importDefault(require("crypto"));
const config = __importStar(require("../app/utils/config"));
const amqp_1 = require("./amqp");
const service_1 = __importDefault(require("./workerservice/service"));
const workerservice_1 = __importDefault(require("./workerservice"));
const telegraf_1 = require("telegraf");
const telegram_1 = __importDefault(require("./telegram"));
const service_2 = __importDefault(require("./telegram/service"));
// secretpath generate
const current_date = new Date().valueOf().toString();
const random = Math.random().toString();
const secretpath = crypto_1.default
    .createHash('sha1')
    .update(current_date + random)
    .digest('hex');
function initTelegramBot(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('TeleBot init...');
        // Telegram bot
        const { TELE_BOT_NAME: name, TELE_BOT_DOMAIN: domain, TELE_BOT_TOKEN: token, TELE_BOT_MODE: mode } = config;
        if (token) {
            const bot = new telegraf_1.Telegraf(token);
            process.once('SIGINT', () => bot.stop('SIGINT'));
            process.once('SIGTERM', () => bot.stop('SIGTERM'));
            const opts = {};
            if (mode === 'webhook') {
                const hookPath = `/${secretpath}`;
                opts.webhook = { domain, hookPath };
            }
            yield bot.launch(opts);
            fastify.decorate(`telebot`, bot);
            console.log(`TeleBot ${name} lanched. Mode is ${mode}`);
        }
    });
}
function connectToAMQP(fastify, opts, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const { AMQP_USER: user, AMQP_PASS: password, AMQP_HOST: host, AMQP_PORT: port } = config;
        console.log('AMQP init...');
        const rabbitClient = new amqp_1.amqpClient({ host, port, user, password });
        try {
            yield rabbitClient.init();
            fastify.decorate(`amqp`, rabbitClient);
            fastify.addHook('onClose', () => rabbitClient.close());
            console.log('AMQP is ready');
            done();
        }
        catch (err) {
            console.log('AMQP init error', err);
        }
    });
}
function decorateFastifyInstance(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        const { QUEUE_TO_BOT: q_to_bot = '', QUEUE_TO_BACK: q_to_back = '' } = config;
        console.log('Decorate Is Loading...');
        const amqpInst = fastify.amqp;
        const workerService = new service_1.default(amqpInst);
        fastify.decorate('workerService', workerService);
        const publisher = yield amqpInst.createPublisher(q_to_back, {
            durable: true,
            persistent: false
        });
        const telebot = fastify.telebot;
        const telegramService = new service_2.default(telebot, publisher);
        const subscribeHandler = telegramService.subscribeToNotifications();
        yield amqpInst.runConsumerForService({ queue: q_to_bot, isNoAck: true }, subscribeHandler);
        fastify.decorate('telegramService', telegramService);
        console.log('Decorate Loaded.');
    });
}
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fastify
            .register(fastify_plugin_1.default(connectToAMQP))
            .register(fastify_plugin_1.default(initTelegramBot))
            .register(fastify_plugin_1.default(decorateFastifyInstance))
            .register(fastify_cors_1.default, {
            origin: /[\.kg|:8765]$/,
            //path: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            exposedHeaders: 'Location,Date'
        })
            // // APIs modules
            .register(workerservice_1.default, { prefix: `/service` })
            .register(telegram_1.default, { prefix: `/${secretpath}` });
    });
}
exports.default = default_1;
