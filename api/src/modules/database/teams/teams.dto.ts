import { ApiModelProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({required: true})
    name: string;

    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({required: true})
    event: string;
    
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({required: true})
    school: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({required: true})
    attendeeId: string;
}
