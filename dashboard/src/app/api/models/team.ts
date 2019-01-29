import { Attendee } from "./attendee";

export interface Team {
    _id: string;
    name: string;
    attendees: Attendee[];
    event?: string;
    school?: string;
    present?: boolean;
    maxMembersNumber: number;
}
