// Filter for coded errors. This is used to have more distinguishable error code unlike HttpStatus.
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CodeException } from "./code.exception";

export interface ErrorStatus {
    message: string;
    statusCode: number;
    [key: string]: any;
}

export type CodeMap = {
    [key: number]: {
        [P in keyof ErrorStatus]: ErrorStatus[P]
    },
};

@Catch(CodeException)
export class CodeExceptionFilter implements ExceptionFilter {
    constructor(private codeMap: CodeMap) {
    }

    catch(exception: CodeException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const code: number = exception.code;
        const errorStatus: ErrorStatus = this.codeMap[code];

        // Set the custom error code
        let res = {
            code: code
        };

        // Set all data bound to the ErrorStatus except statusCode (The HttpStatus).
        for (let p in errorStatus) {
            if (p !== "statusCode") {
                res[p] = errorStatus[p];
            }
        }

        response.status(errorStatus.statusCode).json(res);
    }
}
