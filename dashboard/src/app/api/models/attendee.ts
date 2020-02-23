import { Team } from "./team";

export interface Attendee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedIn: string;
    cv: string;
    website: string;
    gender: string;
    tshirt: string;
    phoneNumber: string;
    acceptSMSNotifications: boolean;
    hasDietaryRestrictions: boolean;
    dietaryRestrictions: string;
    registered: boolean;
    role?: string;
    permissions?: string[];
    handicapped: boolean;
    needsTransportPass: boolean;
    team?: Team[];
    teamId?: string;
    school?: string;
}

export interface AttendeeModel {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedIn: string;
    cv: string;
    website: string;
    gender: string;
    tshirt: string;
    phoneNumber: string;
    acceptSMSNotifications: boolean;
    hasDietaryRestrictions: boolean;
    dietaryRestrictions: string;
    handicapped: boolean;
    needsTransportPass: boolean;
}
