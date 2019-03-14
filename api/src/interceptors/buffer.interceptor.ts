import * as express from "express";
import { ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BufferInterceptor implements NestInterceptor {
    constructor(private contentType: string) { }

    intercept(context: ExecutionContext, call$: Observable<Buffer>): Observable<void> {
        const res = context.switchToHttp().getResponse<express.Response>();
        return call$.pipe(
            map(value => {
                res.setHeader("Content-Type", this.contentType);
                res.setHeader("Content-Length", value.length);
                res.send(value);
            })
        );
    }
}
