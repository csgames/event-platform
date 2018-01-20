import { CodeMap } from "../../../filters/CodedError/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
}

export let codeMap: CodeMap = {
    0: { // UNKNOWN
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }
};
