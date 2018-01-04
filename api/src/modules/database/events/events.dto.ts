import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, ArrayUnique } from "class-validator";
import { EventRegistrations } from "./events.model";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsDate()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    beginDate: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    endDate: Date;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiModelProperty()
    activities: string[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiModelProperty()
    attendees: EventRegistrations[];

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    imageUrl: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    coverUrl: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    facebookEvent: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    locationName: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    locationAddress: string;
}
