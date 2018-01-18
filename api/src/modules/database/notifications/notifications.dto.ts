import { IsString, IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateNotificationsDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    text: string;
}
