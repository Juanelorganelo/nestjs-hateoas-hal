import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "@app/core/typeorm/SnakeNamingStretegy";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env", ".env.local"],
        }),
        TypeOrmModule.forRoot({
            namingStrategy: new SnakeNamingStrategy(),
        }),
    ],
})
export class AppModule {}
