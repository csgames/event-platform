import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateAttendeeDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    github: string;
}
