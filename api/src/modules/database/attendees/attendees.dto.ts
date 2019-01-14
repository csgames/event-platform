import { IsString, IsOptional, IsIn, IsNotEmpty, IsBoolean, IsMongoId } from 'class-validator';
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateAttendeeDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['male', 'female', 'other', 'no_answer'])
    @ApiModelProperty({ required: true })
    gender: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['small', 'medium', 'large', 'x-large', '2x-large'])
    @ApiModelProperty({ required: true })
    tshirt: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    school: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    dietaryRestrictions: string;
}

export class UpdateAttendeeDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsOptional()
    @IsString()
    @IsIn(['male', 'female', 'other', 'no_answer'])
    @ApiModelProperty()
    gender: string;

    @IsOptional()
    @IsString()
    @IsIn(['small', 'medium', 'large', 'x-large', '2x-large'])
    @ApiModelProperty()
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    school: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    dietaryRestrictions: string;
}

export class AddTokenDto {
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    token: string;
}

export class UpdateNotificationDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    notification: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    seen: boolean;
}
