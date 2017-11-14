import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, ArrayUnique } from "class-validator";

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
    attendees: string[];
}
