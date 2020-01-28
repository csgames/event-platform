import { ApiProperty } from "@nestjs/swagger";
import { ArrayUnique, IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ActivityTypes } from "./activities.model";

export class CreateActivityDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: { [lang: string]: string };

    @IsString()
    @IsNotEmpty()
    @IsIn(ActivityTypes)
    @ApiProperty({ required: true })
    type: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    beginDate: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    endDate: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    details: { [lang: string]: string };

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    location: string;

    @IsOptional()
    @IsBoolean()
    hidden: boolean;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiProperty()
    attendees: string[];
}

export class SendNotificationDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    body: string;
}
