import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
}

export const codeMap: CodeMap = {
    0: { // UNKNOWN
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }
};
