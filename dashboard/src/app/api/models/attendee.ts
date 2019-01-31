export interface Attendee {
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
