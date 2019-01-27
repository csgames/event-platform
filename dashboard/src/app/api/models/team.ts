import { Attendee } from "./attendee";

export interface Team {
    name: string;
    attendees: Attendee[];
    event?: string;
    school?: string;
    present?: boolean;
    maxMembersNumber: number;
}
