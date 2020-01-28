import { ApiProperty } from "@nestjs/swagger";
import {
    ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsDefined, IsHexColor, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString,
    ValidateNested
} from "class-validator";
import { EventAttendees } from "./events.model";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string;

    @IsDefined()
    @ApiProperty({ required: true })
    details: object;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    beginDate: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    endDate: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiProperty()
    activities: string[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiProperty()
    attendees: EventAttendees[];

    @IsOptional()
    @IsString()
    @ApiProperty()
    imageUrl: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    coverUrl: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    facebookEvent: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    locationName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    locationAddress: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    maxTeamMembers: number;

    @IsOptional()
    @IsHexColor()
    @ApiProperty()
    primaryColor: string;
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty()
    details: object;

    @IsOptional()
    @ApiProperty()
    beginDate: string;

    @IsOptional()
    @ApiProperty()
    endDate: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiProperty()
    activities: string[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiProperty()
    attendees: EventAttendees[];

    @IsOptional()
    @IsString()
    @ApiProperty()
    imageUrl: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    coverUrl: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    facebookEvent: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    locationName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    locationAddress: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    maxTeamMembers: number;

    @IsOptional()
    @ApiProperty()
    flashoutBeginDate: string;

    @IsOptional()
    @ApiProperty()
    flashoutEndDate: string;

    @IsOptional()
    @IsHexColor()
    @ApiProperty()
    primaryColor: string;
}

export class SendConfirmEmailDto {
    @IsArray()
    @ArrayUnique()
    userIds: string[];
}

export class SponsorDetailsDto {
    @ApiProperty()
    @IsArray()
    @ArrayMaxSize(4)
    @ArrayMinSize(4)
    @IsOptional()
    padding: number[];

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    widthFactor: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    heightFactor: number;
}

export class AddSponsorDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    tier: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    sponsor: string;

    @IsOptional()
    @ValidateNested()
    web: SponsorDetailsDto;

    @IsOptional()
    @ValidateNested()
    mobile: SponsorDetailsDto;
}

export class AddScannedAttendee {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({ required: true })
    scannedAttendee: string;
}

export class SendSmsDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    text: string;
}

export class SendNotificationDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    body: string;
}
