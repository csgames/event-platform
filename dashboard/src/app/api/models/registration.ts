import { Attendee } from "./attendee";

export interface Registration {
    uuid: string;
    attendee: Attendee;
    role: string;
    used: boolean;
}
