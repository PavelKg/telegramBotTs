"use strict";
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
exports.amqpClient = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class amqpClient {
    constructor(opts) {
        this.connections = [];
        this.server = Object.assign({}, opts);
    }
    init() { }
    info() {
        return { connCount: this.connections.length };
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connections.forEach((conn) => {
                var _a;
                (_a = conn.connection) === null || _a === void 0 ? void 0 : _a.close();
            });
        });
    }
    createConn() {
        return __awaiter(this, void 0, void 0, function* () {
            const { host, port, user, password } = this.server;
            let conn = { connection: undefined, channel: undefined };
            try {
                const connection = yield amqplib_1.default.connect(`amqp://${user}:${password}@${host}:${port}/`);
                if (connection) {
                    const channel = yield connection.createChannel();
                    conn = Object.assign(Object.assign({}, conn), { connection, channel });
                    process.once('SIGINT', function () {
                        connection.close();
                    });
                    this.connections.push(conn);
                }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
            return conn;
        });
    }
    createPublisher(queue, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield this.createConn();
                const { durable = true, persistent = false } = opts;
                if (!conn.channel) {
                    throw "Channel wasn't created";
                }
                yield conn.channel.assertQueue(queue, { durable });
                const produce = {
                    send: function (message) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!conn.channel) {
                                Promise.reject('Channel is down');
                            }
                            else {
                                return yield conn.channel.sendToQueue(queue, Buffer.from(message), {
                                    persistent
                                });
                            }
                        });
                    },
                    stop: () => {
                        var _a;
                        (_a = conn.connection) === null || _a === void 0 ? void 0 : _a.close();
                    }
                };
                return produce;
            }
            catch (err) {
                throw err;
            }
        });
    }
    runConsumerForService(opts, serviceCb) {
        return __awaiter(this, void 0, void 0, function* () {
            const { queue, isNoAck = false, durable = false } = opts;
            let consumeEmitter;
            try {
                const conn = yield this.createConn();
                if (!conn.channel) {
                    throw 'Channel is down';
                }
                else {
                    yield conn.channel.assertQueue(queue, { durable });
                    conn.channel.consume(queue, (message) => {
                        if (message !== null) {
                            serviceCb(message.content.toString());
                        }
                        else {
                            throw 'NullMessageException';
                        }
                    }, { noAck: isNoAck });
                }
            }
            catch (error) {
                throw error;
            }
            return Promise.resolve(true);
        });
    }
}
exports.amqpClient = amqpClient;
