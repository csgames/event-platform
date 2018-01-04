import {
    IsString, IsNotEmpty, ArrayMinSize, ArrayMaxSize, IsArray, IsMongoId, ArrayUnique,
    IsOptional
} from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrJoinTeamDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    name: string;

    @IsMongoId()
    @ApiModelProperty({ required: true })
    event: string;
}

export class JoinOrLeaveTeamDto {

    @IsMongoId()
    @ApiModelProperty({ required: true })
    attendeeId: string;

    @IsMongoId()
    @ApiModelProperty({ required: true })
    teamId: string;
}
