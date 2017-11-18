import { CodeMap } from "../../../filters/CodedError/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    ATTENDEE_ALREADY_REGISTERED,
    USER_NOT_ATTENDEE
}

export let codeMap: CodeMap = {
    0: { // UNKNOWN
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    1: { // ATTENDEE_ALREADY_REGISTERED
        message: "Attendee already registered to the event.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    2: { // USER_NOT_ATTENDEE
        message: "User is not an attendee.",
        statusCode: HttpStatus.BAD_REQUEST
    }
};
