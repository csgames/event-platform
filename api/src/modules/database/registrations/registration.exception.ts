import { CodeException } from '../../../filters/code-error/code.exception';
import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    ATTENDEE_ALREADY_EXIST,
    TEAM_ALREADY_EXIST
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: 'An unknown error happened.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.ATTENDEE_ALREADY_EXIST]: {
        message: 'Attendee already exist.',
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.TEAM_ALREADY_EXIST]: {
        message: 'Team already exist.',
        statusCode: HttpStatus.BAD_REQUEST
    }
}

export class AttendeeAlreadyExistException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_ALREADY_EXIST);
    }
}

export class TeamAlreadyExistException extends CodeException {
    constructor () {
        super(Code.TEAM_ALREADY_EXIST);
    }
}