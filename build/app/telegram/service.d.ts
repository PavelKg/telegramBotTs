import { Producer } from '../amqp/types/amqpclient';
import { Telegraf, Context } from 'telegraf';
import { FastifyRequest, FastifyReply } from 'fastify';
export default class TelegramService {
    bot: Telegraf<Context> | undefined;
    notifier: Producer | undefined;
    constructor(bot: Telegraf<Context>, notifier: Producer);
    init(): void;
    subscribeToNotifications(): (msg: string) => void;
    handleUpdate(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
