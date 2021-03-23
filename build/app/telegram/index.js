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
function default_1(fastify, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        // Route registration
        // fastify.<method>(<path>, <schema>, <handler>)
        // schema is used to validate the input and serialize the output
        // Unlogged APIs
        fastify.post('/', {}, messHandler);
        fastify.get('/', {}, testHandler);
    });
}
exports.default = default_1;
module.exports[Symbol.for('plugin-meta')] = {
    decorators: {
        fastify: ['TelegramService']
    }
};
function messHandler(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.telegramService.handleUpdate(req, reply);
        reply.code(200).send();
    });
}
function testHandler(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req);
        reply.code(200).send('Hello World!!!');
    });
}
