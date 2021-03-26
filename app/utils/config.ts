import * as dotenv from 'dotenv'

dotenv.config()
let path
path = `${__dirname}/../../.env`
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
dotenv.config({path: path})

export const {PORT, SERVER_TYPE} = process.env
export const {AMQP_HOST, AMQP_USER, AMQP_PASS, AMQP_PORT} = process.env
export const {
  TELE_BOT_NAME,
  TELE_BOT_DOMAIN,
  TELE_BOT_TOKEN,
  TELE_BOT_MODE = 'Pooling'
} = process.env
export const {QUEUE_TO_BOT, QUEUE_TO_BACK} = process.env
