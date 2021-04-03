import { Producer, ServerOpts, Conn, QueueOpt, PublisherOpts } from './types/amqpclient';
declare class amqpClient {
    connections: Array<Conn>;
    server: ServerOpts;
    constructor(opts: ServerOpts);
    init(): void;
    info(): {
        connCount: number;
    };
    close(): Promise<void>;
    createConn(): Promise<Conn>;
    createPublisher(queue: string, opts: PublisherOpts): Promise<Producer>;
    runConsumerForService(opts: QueueOpt, serviceCb: Function): Promise<boolean>;
}
export { amqpClient };
