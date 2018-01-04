import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional, ArrayUnique } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateActivityDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsDate()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    beginDate: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    location: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ApiModelProperty()
    attendees: string[];
}
