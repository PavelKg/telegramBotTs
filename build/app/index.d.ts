import { FastifyInstance } from 'fastify';
import { amqpClient } from './amqp';
import { Context } from 'telegraf';
declare module 'fastify' {
    interface FastifyInstance {
        amqp: amqpClient;
        telebot: Context;
    }
}
export default function (fastify: FastifyInstance): Promise<void>;
