import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateNotificationsDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    text: string;
}

export class SmsDto {
    @IsArray()
    publicIds: string[];

    @IsString()
    @IsNotEmpty()
    text: string;
}
