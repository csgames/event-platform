import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsDateString } from "class-validator";

export class CreateUserDto {

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
    @Matches(/(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$)/g)
    password: string;

    @IsNotEmpty()
    @IsDateString()
    birthDate: Date;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
}
