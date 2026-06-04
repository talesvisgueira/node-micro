"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../node_modules/@myorg/logger/src/index");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT ?? 3000;
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Markatplace API Gateway')
        .setDescription('API Gateway for Markatplace microservice')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.listen(port);
    (0, index_1.Logger)(`API Gateway ruuning on port ${port}`);
    (0, index_1.Logger)(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map