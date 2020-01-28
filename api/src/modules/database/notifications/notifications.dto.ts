import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNotificationsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    body: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    event: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    attendees: string[];

    @IsOptional()
    @ApiProperty()
    data: any;
}

export class SmsDto {
    @IsArray()
    publicIds: string[];

    @IsString()
    @IsNotEmpty()
    text: string;
}
