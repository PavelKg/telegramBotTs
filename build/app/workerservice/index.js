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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_json_1 = __importDefault(require("./schemas/querystring.json"));
const html_temp = `
<html >
  <head>
    <title>The Rock (1996)</title>
    <meta name="description" content="A mild-mannered chemist and an ex-con must lead the counterstrike" />
<meta property="og:description" content="A mild-mannered chemist and an ex-con must lead the counterstrike" />
<meta property="og:title" content="The Rock11" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="https://botkg.ga/service/player" />
<meta property="og:image" content="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
<meta property="og:image:type" content="image/jpeg" />
    	
    
  </head>
  <body><H1>AAAABBB</h1></body>
</html>`;
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', {
            schema: {
                querystring: querystring_json_1.default
            }
        }, getServices);
        fastify.get('/player', getPlayer);
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
function getPlayer(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('html');
        const html = html_temp;
        reply.type('text/html').send(html);
    });
}
