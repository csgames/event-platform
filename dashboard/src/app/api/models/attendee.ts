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
    isRegistered: boolean;
    role?: string;
    permissions?: string[];
}
