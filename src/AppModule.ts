import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@app/users/UsersModule";
import { HateoasModule } from "@core/hateoas/HateoasModule";
import { SnakeNamingStrategy } from "@core/typeorm/SnakeNamingStretegy";

@Module({
    imports: [
        UsersModule,
        HateoasModule,
        ConfigModule.forRoot({
            envFilePath: [".env", ".env.local"],
        }),
        TypeOrmModule.forRoot({
            namingStrategy: new SnakeNamingStrategy(),
            autoLoadEntities: true,
        }),
    ],
})
export class AppModule {}
