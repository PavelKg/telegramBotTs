import * as dotenv from "dotenv";

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

export const PORT = process.env.PORT;
export const {AMQP_HOST, AMQP_USER, AMQP_PASS, AMQP_PORT} = process.env;

