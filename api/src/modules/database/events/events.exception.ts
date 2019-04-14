import { HttpStatus } from "@nestjs/common";
import { CodeException } from "../../../filters/code-error/code.exception";
import { CodeMap } from "../../../filters/code-error/code.filter";

export enum Code {
    UNKNOWN,
    ATTENDEE_ALREADY_REGISTERED,
    USER_NOT_ATTENDEE,
    ATTENDEE_NOT_SELECTED,
    EVENT_NOT_FOUND
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.ATTENDEE_ALREADY_REGISTERED]: {
        message: "Attendee already registered to the event.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.USER_NOT_ATTENDEE]: {
        message: "User is not an attendee.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.ATTENDEE_NOT_SELECTED]: {
        message: "Attendee is not selected.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.EVENT_NOT_FOUND]: {
        message: "Event not found",
        statusCode: HttpStatus.NOT_FOUND
    }
};

export class AttendeeAlreadyRegisteredException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_ALREADY_REGISTERED);
    }
}

export class UserNotAttendeeException extends CodeException {
    constructor() {
        super(Code.USER_NOT_ATTENDEE);
    }
}

export class AttendeeNotSelectedException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_NOT_SELECTED);
    }
}

export class EventNotFoundException extends CodeException {
    constructor() {
        super(Code.EVENT_NOT_FOUND);
    }
}
