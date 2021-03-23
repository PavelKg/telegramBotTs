"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkerService {
    constructor(rabbit) {
        this.rabbitService = rabbit;
    }
    getServices() {
        return this.rabbitService.info();
    }
}
exports.default = WorkerService;
