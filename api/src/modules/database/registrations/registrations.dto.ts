import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf, ValidateNested, IsBoolean } from 'class-validator';
import { CreateAttendeeDto } from '../attendees/attendees.dto';

export class CreateRegistrationDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['attendee', 'captain', 'godparent', 'sponsor'])
    @ApiModelProperty({ required: true })
    role: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    lastName: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    teamName: string;

    @IsMongoId()
    @IsNotEmpty()
    @ValidateIf(x => x.role === 'captain')
    @ApiModelProperty({ required: true })
    schoolId: string;

    @IsMongoId()
    @IsNotEmpty()
    @ValidateIf(x => x.role === 'sponsor')
    @ApiModelProperty({ required: true })
    sponsorId: string;

    @IsNumber()
    @ValidateIf(x => x.role === 'captain')
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    maxMembersNumber: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    showOnScoreboard: boolean;
}

export class RegisterAttendeeDto {
    @IsUUID("4")
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    uuid: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    username: string;

    /*
     * At least 6 characters
     * At least one digit
     * At least one uppercase
     * At least one lowercase
     */
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}

export class RegisterRoleDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['admin', 'volunteer', 'director'])
    @ApiModelProperty({ required: true })
    role: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    username: string;

    /*
     * At least 6 characters
     * At least one digit
     * At least one uppercase
     * At least one lowercase
     */
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}
