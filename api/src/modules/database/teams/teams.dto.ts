import { ApiModelProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateOrJoinTeamDto {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({required: true})
    name: string;

    @IsMongoId()
    @ApiModelProperty({required: true})
    event: string;
}

export class JoinOrLeaveTeamDto {

    @IsMongoId()
    @ApiModelProperty({required: true})
    attendeeId: string;

    @IsMongoId()
    @ApiModelProperty({required: true})
    teamId: string;

    @IsMongoId()
    @ApiModelProperty({required: true})
    event: string;
}

export class UpdateLHGamesTeamDto {

    @IsMongoId()
    @ApiModelProperty({required: true})
    programmingLanguage: string;
}
