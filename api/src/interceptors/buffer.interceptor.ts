import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import * as express from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BufferInterceptor implements NestInterceptor {
    constructor(private contentType: string) {
    }

    public intercept(context: ExecutionContext, next: CallHandler<Buffer>): Observable<void> {
        const res = context.switchToHttp().getResponse<express.Response>();
        return next.handle().pipe(
            map(value => {
                res.setHeader("Content-Type", this.contentType);
                res.setHeader("Content-Length", value.length);
                res.send(value);
            })
        );
    }
}
