import {
    ArrayUnique, IsArray, IsDate, IsDefined, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';
import { EventRegistrations } from './events.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['mlh', 'lhgames'])
    @ApiModelProperty({ required: true })
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsDefined()
    @ApiModelProperty({ required: true })
    details: object;

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

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    maxTeamMembers: number;
}

export class SendConfirmEmailDto {
    @IsArray()
    @ArrayUnique()
    userIds: string[];
}
