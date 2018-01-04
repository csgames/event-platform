import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsDateString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {

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
    @Matches(/(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$)/g)
    @ApiModelProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiModelProperty({ required: true })
    birthDate: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    lastName: string;
}
