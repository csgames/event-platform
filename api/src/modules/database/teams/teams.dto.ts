import { ApiModelProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({required: true})
    name: string;

    @IsMongoId()
    @ApiModelProperty({required: true})
    event: string;
}

export class LeaveTeamDto {
    @IsMongoId()
    @ApiModelProperty({required: true})
    attendeeId: string;

    @IsMongoId()
    @ApiModelProperty({required: true})
    teamId: string;
}

export class UpdateTeamDto {
    @IsOptional()
    @IsMongoId()
    @ApiModelProperty({required: true})
    teamId: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({required: true})
    name: string;

    @IsOptional()
    @IsMongoId()
    @ApiModelProperty({required: true})
    attendeesId: string;

    @IsOptional()
    @IsMongoId()
    @ApiModelProperty({required: true})
    eventId: string;


}