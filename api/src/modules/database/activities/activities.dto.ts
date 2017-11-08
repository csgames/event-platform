import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional } from "class-validator";
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

    @IsOptional()
    @IsArray()
    attendees: mongoose.Schema.Types.ObjectId[];
}
