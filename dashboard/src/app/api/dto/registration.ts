import { CreateAttendeeDto } from "./attendee";

export interface RegisterAttendeeDto {
    uuid: string;
    username: string;
    password: string;
    attendee: CreateAttendeeDto;
}
