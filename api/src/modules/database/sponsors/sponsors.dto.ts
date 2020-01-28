import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSponsorDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    description: { [language: string]: object };

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}

export class UpdateSponsorDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    description: { [language: string]: object };

    @ApiProperty()
    @IsString()
    @IsOptional()
    website: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    imageUrl: string;
}
