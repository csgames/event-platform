import { Activity } from "./activity";
import { Attendee } from "./attendee";

export interface Competition {
    activity: Activity;
    maxMembersNumber: number;
    live: boolean;
    members: Members;
    answers: Answers;
    questions: string;
    directors: Attendee[];
}

export interface Members {
    teamId: string;
    attendees: Attendee[];
}

export interface Answers {
    teamId: string;
    value: any;
}
