import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, ArrayUnique } from "class-validator";

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

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    attendees: string[];
}
