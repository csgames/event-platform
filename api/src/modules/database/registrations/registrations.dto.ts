import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf, ValidateNested } from 'class-validator';
import { CreateAttendeeDto } from '../attendees/attendees.dto';

export class CreateRegistrationDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    eventId: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['attendee', 'captain', 'godfather'])
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

    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    schoolId: string;

    @IsString()
    @ValidateIf(x => x.role === 'captain')
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    teamName: string;

    @IsNumber()
    @ValidateIf(x => x.role === 'captain')
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    maxMembersNumber: number;
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
