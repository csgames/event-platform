import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttendeeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(["male", "female", "other", "no_answer"])
    @ApiProperty({ required: true })
    gender: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(["small", "medium", "large", "x-large", "2x-large"])
    @ApiProperty({ required: true })
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty()
    dietaryRestrictions: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    handicapped: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    needsTransportPass: boolean;
}

export class UpdateAttendeeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @IsIn(["male", "female", "other", "no_answer"])
    @ApiProperty()
    gender: string;

    @IsOptional()
    @IsString()
    @IsIn(["small", "medium", "large", "x-large", "2x-large"])
    @ApiProperty()
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty()
    dietaryRestrictions: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    handicapped: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    needsTransportPass: boolean;
}

export class AddTokenDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    token: string;
}

export class UpdateNotificationDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    notification: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    seen: boolean;
}
