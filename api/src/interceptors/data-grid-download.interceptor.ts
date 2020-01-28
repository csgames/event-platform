import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import * as express from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DataGridDownloadInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler<Buffer | string>): Observable<any> {
        const type = context.switchToHttp().getRequest<express.Request>().query.type;
        const res = context.switchToHttp().getResponse<express.Response>();
        return next.handle().pipe(
            map(value => {
                if (type === "xlsx") {
                    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    res.setHeader("Content-Length", value.length);
                } else if (type === "csv") {
                    res.setHeader("Content-Type", "text/csv");
                    res.setHeader("Content-Length", value.length);
                } else if (!type) {
                    return value;
                }

                res.send(value);
            })
        );
    }
}
