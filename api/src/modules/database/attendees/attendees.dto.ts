import { IsString, IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class CreateAttendeeDto {

    @IsOptional()
    @IsString()
    github: string;

    @IsOptional()
    @IsString()
    linkedIn: string;

    @IsOptional()
    @IsString()
    cvLink: string;

    @IsOptional()
    @IsString()
    website: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['cegep', 'bachelor', 'master', 'phd'])
    degree: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['male', 'female', 'other', 'no_answer'])
    gender: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['small', 'medium', 'large', 'x-large', '2x-large'])
    tshirt: string;

    @IsString()
    @IsNotEmpty()
    school: string;
}
