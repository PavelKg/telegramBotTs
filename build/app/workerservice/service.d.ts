import { amqpClient } from '../amqp';
declare class WorkerService {
    rabbitService: amqpClient;
    constructor(rabbit: amqpClient);
    getServices(): {
        connCount: number;
    };
}
export default WorkerService;
