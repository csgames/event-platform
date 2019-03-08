import { ApiModelProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActivityTypes } from './activities.model';

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: { [lang: string]: string };

    @IsString()
    @IsNotEmpty()
    @IsIn(ActivityTypes)
    @ApiModelProperty({ required: true })
    type: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    beginDate: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    endDate: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    details: { [lang: string]: string };

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    location: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiModelProperty()
    attendees: string[];
}

export class SendNotificationDto {
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    body: string;
}
