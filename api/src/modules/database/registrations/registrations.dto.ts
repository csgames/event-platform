import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean, IsEmail, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf, ValidateNested
} from "class-validator";
import { CreateAttendeeDto } from "../attendees/attendees.dto";

export class CreateRegistrationDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(["attendee", "captain", "godparent", "sponsor"])
    @ApiProperty({ required: true })
    role: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    lastName: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    teamName: string;

    @IsMongoId()
    @IsNotEmpty()
    @ValidateIf(x => x.role === "captain")
    @ApiProperty({ required: true })
    schoolId: string;

    @IsMongoId()
    @IsNotEmpty()
    @ValidateIf(x => x.role === "sponsor")
    @ApiProperty({ required: true })
    sponsorId: string;

    @IsNumber()
    @ValidateIf(x => x.role === "captain")
    @IsNotEmpty()
    @ApiProperty({ required: true })
    maxMembersNumber: number;

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: true })
    showOnScoreboard: boolean;
}

export class RegisterAttendeeDto {
    @IsUUID("4")
    @IsNotEmpty()
    @ApiProperty({ required: true })
    uuid: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string;

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

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}

export class RegisterRoleDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(["admin", "volunteer", "director"])
    @ApiProperty({ required: true })
    role: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string;

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

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}
