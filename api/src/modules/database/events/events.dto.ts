import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, ArrayUnique } from "class-validator";
import { EventRegistrations } from "./events.model";

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsNotEmpty()
    beginDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    activities: string[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    attendees: EventRegistrations[];

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    coverUrl: string;

    @IsOptional()
    @IsString()
    website: string;

    @IsOptional()
    @IsString()
    facebookEvent: string;

    @IsOptional()
    @IsString()
    locationName: string;

    @IsOptional()
    @IsString()
    locationAddress: string;
}
