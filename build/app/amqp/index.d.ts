import { ServerOpts, Conn, PubOpts, Producer, QueueOpt } from '../../types/ampqclient';
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
    createPublisher(queue: string, opts: PubOpts): Promise<Producer>;
    runConsumerForService(opts: QueueOpt, serviceCb: Function): Promise<void>;
}
export { Producer, amqpClient };
