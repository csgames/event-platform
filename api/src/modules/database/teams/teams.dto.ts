import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateIf } from "class-validator";


export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    event: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.sponsor)
    @ApiProperty({ required: true })
    school: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.school)
    @ApiProperty({ required: true })
    sponsor: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    attendeeId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    maxMembersNumber: number;

    @IsBoolean()
    @IsNotEmpty()
    showOnScoreboard: boolean;
}

export class UpdateTeamDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @ApiProperty({ required: true })
    name: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    maxMembersNumber: number;

    @IsOptional()
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.sponsor)
    @ApiProperty({ required: true })
    school: string;

    @IsOptional()
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.school)
    @ApiProperty({ required: true })
    sponsor: string;
}
