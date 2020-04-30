import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePasswordResetDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string;
}

export class ResetPasswordDto {
    /*
     * At least 6 characters
     * At least one digit
     * At least one uppercase
     * At least one lowercase
     */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string;
}
