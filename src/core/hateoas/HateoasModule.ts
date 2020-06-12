import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HateoasInterceptor } from "./HateoasInterceptor";

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: HateoasInterceptor,
        },
    ],
})
export class HateoasModule {}
