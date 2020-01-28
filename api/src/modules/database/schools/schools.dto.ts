import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoolDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    website: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    countryCode: string;
}
