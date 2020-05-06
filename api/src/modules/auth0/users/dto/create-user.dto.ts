import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class CreateUserDto {
    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password: string;
}
