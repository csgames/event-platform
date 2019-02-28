import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAttendeeDto } from '../attendees/attendees.dto';

export class CreateCompetitionDto {
    @IsNotEmpty()
    @ArrayNotEmpty()
    activities: string[];

    @IsOptional()
    directors: string[];

    @IsNotEmpty()
    @IsNumber()
    maxMembers: number;
}

export class CreateDirectorDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    username: string;

    /*
     * At least 6 characters
     * At least one digit
     * At least one uppercase
     * At least one lowercase
     */
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}
