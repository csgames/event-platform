import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsArray, IsMongoId } from "class-validator";
import { Attendees } from "../attendees/attendees.model";

export class CreateTeamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(4)
    attendees: mongoose.Schema.Types.ObjectId[];

    @IsMongoId()
    event: mongoose.Schema.Types.ObjectId;
}
