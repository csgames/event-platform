import { CodeMap } from "../../../filters/CodedError/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    ATTENDEE_NOT_FOUND,
    TEAM_NOT_FOUND,
    TEAM_FULL,
    ATTENDEE_HAS_TEAM,
    ATTENDEE_NOT_IN_TEAM
}

export let codeMap: CodeMap = {
    0: { // UNKNOWN
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    1: { // ATTENDEE_NOT_FOUND
        message: "Attendee not found.",
        statusCode: HttpStatus.NOT_FOUND
    },
    2: { // TEAM_NOT_FOUND
        message: "Team not found.",
        statusCode: HttpStatus.NOT_FOUND
    },
    3: { // TEAM_FULL
        message: "Team already full.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    },
    4: { // ATTENDEE_HAS_TEAM
        message: "Attendee already has a team.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    },
    5: { // ATTENDEE_NOT_IN_TEAM
        message: "Attendee is not in this team.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    }
};
