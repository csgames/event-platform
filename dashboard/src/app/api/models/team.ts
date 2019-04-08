import { Attendee } from "./attendee";

export interface Team {
    _id: string;
    name: string;
    attendees: Attendee[];
    event?: string;
    school?: string;
    sponsor?: string;
    present?: boolean;
    maxMembersNumber: number;
}
