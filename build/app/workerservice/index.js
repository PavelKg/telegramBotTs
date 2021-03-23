"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', getServices);
    });
}
exports.default = default_1;
// module.exports[Symbol.for('plugin-meta')] = {
//   decorators: {
//     fastify: ['workerService']
//   }
// }
function getServices(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(Object.keys(req));
        console.log(Object.keys(reply));
        const info = yield this.workerService.getServices();
        reply.code(200).send(info);
    });
}
