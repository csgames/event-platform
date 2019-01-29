import { CreateAttendeeDto } from "./attendee";

export interface RegisterAttendeeDto {
    uuid: string;
    username: string;
    password: string;
    attendee: CreateAttendeeDto;
}

export interface CreateInvitationDto {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    teamName: string;
}
