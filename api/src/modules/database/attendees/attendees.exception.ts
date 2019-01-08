import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    USER_NOT_ATTENDEE,
    ATTENDEE_FIND_ERROR,
    USER_IS_ALREADY_ATTENDEE
}

export const codeMap: CodeMap = {
    0: { // UNKNOWN
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    1: { // USER_NOT_ATTENDEE
        message: "Only attendees can execute this request.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    2: { // ATTENDEE_FIND_ERROR
        message: "Error while finding attendee.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    3: { // USER_IS_ALREADY_ATTENDEE
        message: "A user cannot be linked to more than one attendee.",
        statusCode: HttpStatus.BAD_REQUEST
    }
};
