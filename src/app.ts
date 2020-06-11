import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./AppModule";

/**
 * Start the application.
 * This resolves dependencies and starts the server.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    const host = config.get<string>("HOST", "0.0.0.0");
    const port = config.get<number>("PORT", 8080);

    await app.listen(port, host);
}

bootstrap();
