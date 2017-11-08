import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsDate, IsArray, ArrayNotEmpty, IsOptional } from "class-validator";
import { Attendees } from "../attendees/attendees.model";
import { Activities } from "../activities/activities.model";

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
    activities: mongoose.Schema.Types.ObjectId[];

    @IsOptional()
    @IsArray()
    attendees: mongoose.Schema.Types.ObjectId[];
}
