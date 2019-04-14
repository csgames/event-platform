import { ApiModelProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNotificationsDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    body: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    event: string;

    @IsArray()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    attendees: string[];

    @IsOptional()
    @ApiModelProperty()
    data: any;
}

export class SmsDto {
    @IsArray()
    publicIds: string[];

    @IsString()
    @IsNotEmpty()
    text: string;
}
