import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
