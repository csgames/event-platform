import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateSchoolDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    website: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    countryCode: string;
}
