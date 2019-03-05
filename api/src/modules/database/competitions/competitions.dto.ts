import { ArrayNotEmpty, IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAttendeeDto } from '../attendees/attendees.dto';
import { CreateQuestionDto } from '../questions/questions.dto';

export class CreateCompetitionDto {
    @IsNotEmpty()
    @ArrayNotEmpty()
    activities: string[];

    @IsOptional()
    directors: string[];

    @IsNotEmpty()
    @IsNumber()
    maxMembers: number;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateCompetitionDto {
    @IsOptional()
    @ArrayNotEmpty()
    activities: string[];

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    maxMembers: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isLive: boolean;
}

export class AuthCompetitionDto {
    @IsString()
    @IsNotEmpty()
    password: string;
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

export class CreateCompetitionQuestionDto extends CreateQuestionDto {
    @IsOptional()
    @IsMongoId()
    dependsOn: string;
}
