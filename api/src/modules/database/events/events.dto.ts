import {
    ArrayMaxSize, ArrayMinSize,
    ArrayUnique, IsArray, IsDate, IsDefined, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';
import { EventRegistrations } from './events.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsDefined()
    @ApiModelProperty({ required: true })
    details: object;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    beginDate: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    endDate: string;

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

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    name: string;

    @IsOptional()
    @ApiModelProperty()
    details: object;

    @IsOptional()
    @ApiModelProperty()
    beginDate: string;

    @IsOptional()
    @ApiModelProperty()
    endDate: string;

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

export class AddSponsorDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    tier: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    sponsor: string;

    @ApiModelProperty()
    @IsArray()
    @ArrayMaxSize(4)
    @ArrayMinSize(4)
    @IsOptional()
    padding: number[];

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    widthFactor: number;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    heightFactor: number;
}

export class AddScannedAttendee {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiModelProperty({ required: true })
    scannedAttendee: string;
}

export class SendSmsDto {
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    text: string;
}

export class SendNotificationDto {
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    body: string;
}
