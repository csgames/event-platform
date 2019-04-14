import { HttpStatus } from "@nestjs/common";
import { CodeMap } from "../../../filters/code-error/code.filter";

export enum Code {
    UNKNOWN,
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }
};
