export interface CreateAttendeeDto {
    firstName: string;
    lastName: string;
    github?: string;
    linkedIn?: string;
    website?: string;
    cv?: string;
    gender?: "male" | "female" | "other" | "no_answer";
    tshirt?: "small" | "medium" | "large" | "x-large" | "2x-large";
    phoneNumber?: string;
    acceptSMSNotifications?: boolean;
    hasDietaryRestrictions?: boolean;
    dietaryRestrictions?: string;
}
