import { IsString, IsNotEmpty, IsDate, IsArray, ArrayNotEmpty } from "class-validator";
import { Attendees } from "../attendees/attendees.model";

export class CreateActivityDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsNotEmpty()
    beginDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsArray()
    attendees: Attendees[];
}
