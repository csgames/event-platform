import { CodeException } from '../../../filters/code-error/code.exception';
import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    USER_NOT_ATTENDEE,
    ATTENDEE_FIND_ERROR,
    USER_IS_ALREADY_ATTENDEE
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.USER_NOT_ATTENDEE]: {
        message: "Only attendees can execute this request.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.ATTENDEE_FIND_ERROR]: {
        message: "Error while finding attendee.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.USER_IS_ALREADY_ATTENDEE]: {
        message: "A user cannot be linked to more than one attendee.",
        statusCode: HttpStatus.BAD_REQUEST
    }
};

export class UserNotAttendeeException extends CodeException {
    constructor() {
        super(Code.USER_NOT_ATTENDEE);
    }
}

export class AttendeeFindErrorException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_FIND_ERROR);
    }
}

export class UserAlreadyAttendeeException extends CodeException {
    constructor() {
        super(Code.USER_IS_ALREADY_ATTENDEE);
    }
}
