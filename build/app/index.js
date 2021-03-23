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
const amqp_1 = require("./amqp");
const config = __importStar(require("../app/utils/config"));
const service_1 = __importDefault(require("./workerservice/service"));
const workerservice_1 = __importDefault(require("./workerservice"));
const crypto_1 = __importDefault(require("crypto"));
// const TelegramService = require('./telegram/service')
// const RabbitService = require('./rabbitmq/service')
// secretpath generate
const current_date = new Date().valueOf().toString();
const random = Math.random().toString();
const secretpath = crypto_1.default
    .createHash('sha1')
    .update(current_date + random)
    .digest('hex');
// async function initTelegramBot(fastify) {
//   console.log('TeleBot init...')
//   // Telegram bot
//   const botSettings = config.botList[config.botName]
//   const webHookPath = `https://${config.domen}/${secretpath}`
//   const bot = new Telegraf(botSettings)
//   bot.telegram.setWebhook(webHookPath)
//   fastify.decorate(`telebot`, bot)
//   console.log(`TeleBot ${config.botName} activated.`)
// }
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
function decorateFastifyInstance(fastify, opts, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Decorate Is Loading...');
        fastify.decorate('telegramService', (a, b) => a + b);
        const amqpInst = fastify.amqp;
        const workerService = new service_1.default(amqpInst);
        fastify.decorate('workerService', workerService);
        const publisher = yield amqpInst.createPublisher('bot_to_backend', {
            durable: true,
            persistent: false
        });
        publisher.send('aaabbb').then((res) => {
            console.log(res);
        });
        //const telebot = fastify.telebot
        // const rabbitService = new RabbitService(amqpChannel, telebot)
        // const telegramService = new TelegramService(telebot, rabbitService)
        // fastify.decorate('telegramService', telegramService)
        // fastify.decorate('rabbitService', rabbitService)
        console.log('Decorate Loaded.', Object.keys(fastify));
    });
}
function default_1(fastify, opts, done) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fastify
            .register(fastify_plugin_1.default(connectToAMQP))
            //done()
            //register(fp(initTelegramBot))
            .register(fastify_plugin_1.default(decorateFastifyInstance))
            // .register(cors, {
            //   origin: /[\.kg|:8769|:8080]$/,
            //   path: '*',
            //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            //   exposedHeaders: 'Location,Date'
            // })
            // // APIs modules
            // //.register(Rabbitmq)
            .register(workerservice_1.default, { prefix: `/service` });
    });
}
exports.default = default_1;
