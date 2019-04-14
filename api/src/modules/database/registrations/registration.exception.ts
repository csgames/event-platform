import { HttpStatus } from "@nestjs/common";
import { CodeException } from "../../../filters/code-error/code.exception";
import { CodeMap } from "../../../filters/code-error/code.filter";

export enum Code {
    UNKNOWN,
    ATTENDEE_ALREADY_EXIST,
    TEAM_ALREADY_EXIST,
    TEAM_DOESNT_EXIST,
    MAX_TEAM_MEMBER_NUMBER,
    GOD_PARENT_ALREADY_EXIST,
    INVALID_CODE
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.ATTENDEE_ALREADY_EXIST]: {
        message: "Attendee already exist.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.TEAM_ALREADY_EXIST]: {
        message: "Team already exist.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.TEAM_DOESNT_EXIST]: {
        message: "Team doesn't exist.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.MAX_TEAM_MEMBER_NUMBER]: {
        message: "The maximum amount of members in the team has been already reached.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.GOD_PARENT_ALREADY_EXIST]: {
        message: "The current team has already a godparent.",
        statusCode: HttpStatus.BAD_REQUEST
    },
    [Code.INVALID_CODE]: {
        message: "Invalid code",
        statusCode: HttpStatus.BAD_REQUEST
    }
};

export class AttendeeAlreadyExistException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_ALREADY_EXIST);
    }
}

export class TeamAlreadyExistException extends CodeException {
    constructor() {
        super(Code.TEAM_ALREADY_EXIST);
    }
}

export class TeamDoesntExistException extends CodeException {
    constructor() {
        super(Code.TEAM_DOESNT_EXIST);
    }
}

export class MaxTeamMemberException extends CodeException {
    constructor() {
        super(Code.MAX_TEAM_MEMBER_NUMBER);
    }
}

export class GodParentAlreadyExist extends CodeException {
    constructor() {
        super(Code.GOD_PARENT_ALREADY_EXIST);
    }
}

export class InvalidCodeException extends CodeException {
    constructor() {
        super(Code.INVALID_CODE);
    }
}
