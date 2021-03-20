import {amqpClient} from '../amqp'

class WorkerService {
  rabbitService
  constructor(rabbit: amqpClient) {
    this.rabbitService = rabbit
  }
  
  getServices() {
    return this.rabbitService.info()
  }
}

export default WorkerService
