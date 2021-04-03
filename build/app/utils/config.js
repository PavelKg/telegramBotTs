"use strict";
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE_TO_BACK = exports.QUEUE_TO_BOT = exports.TELE_BOT_MODE = exports.TELE_BOT_TOKEN = exports.TELE_BOT_DOMAIN = exports.TELE_BOT_NAME = exports.AMQP_PORT = exports.AMQP_PASS = exports.AMQP_USER = exports.AMQP_HOST = exports.SERVER_TYPE = exports.PORT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let path;
path = `${__dirname}/../../.env`;
// switch (process.env.NODE_ENV) {
//   case "test":
//     path = `${__dirname}/../../.env.test`;
//     break;
//   case "production":
//     path = `${__dirname}/../../.env.production`;
//     break;
//   default:
//     path = `${__dirname}/../../.env.development`;
// }
dotenv.config({ path: path });
_a = process.env, exports.PORT = _a.PORT, exports.SERVER_TYPE = _a.SERVER_TYPE;
_b = process.env, exports.AMQP_HOST = _b.AMQP_HOST, exports.AMQP_USER = _b.AMQP_USER, exports.AMQP_PASS = _b.AMQP_PASS, exports.AMQP_PORT = _b.AMQP_PORT;
_c = process.env, exports.TELE_BOT_NAME = _c.TELE_BOT_NAME, exports.TELE_BOT_DOMAIN = _c.TELE_BOT_DOMAIN, exports.TELE_BOT_TOKEN = _c.TELE_BOT_TOKEN, _d = _c.TELE_BOT_MODE, exports.TELE_BOT_MODE = _d === void 0 ? 'Pooling' : _d;
_e = process.env, exports.QUEUE_TO_BOT = _e.QUEUE_TO_BOT, exports.QUEUE_TO_BACK = _e.QUEUE_TO_BACK;
