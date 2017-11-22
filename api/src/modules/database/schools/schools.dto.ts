import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSchoolDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    website: string;

    @IsString()
    @IsNotEmpty()
    countryCode: string;
}
