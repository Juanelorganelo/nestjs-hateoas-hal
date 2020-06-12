import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { tap } from "rxjs/operators";
import { HateoasModel } from "./HateoasModel";
import { MEDIA_TYPE_JSON_HAL } from "./constants";

/**
 * A NestJS interceptor that complements HATEOAS models.
 */
export class HateoasInterceptor implements NestInterceptor {
    public intercept(executionContext: ExecutionContext, handler: CallHandler): any {
        const ctx = executionContext.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        return handler.handle().pipe(
            tap(data => {
                if (data instanceof HateoasModel) {
                    // Add self link if it doesn't exists.
                    if (!data.links.has("self")) {
                        data.linkTo(executionContext.getClass()).method(
                            executionContext.getHandler(),
                            {
                                rel: "self",
                                query: request.query,
                                params: request.params,
                            },
                        );
                    }
                    // Set the content-type of the response.
                    response.setHeader("content-type", MEDIA_TYPE_JSON_HAL);
                }
            }),
        );
    }
}
