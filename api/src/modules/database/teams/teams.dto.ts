import { ApiModelProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, MaxLength, IsNumber, ValidateIf, IsOptional, IsBoolean } from 'class-validator';


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
    @ValidateIf(x => !x.sponsor)
    @ApiModelProperty({required: true})
    school: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.school)
    @ApiModelProperty({required: true})
    sponsor: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({required: true})
    attendeeId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    maxMembersNumber: number;

    @IsBoolean()
    @IsNotEmpty()
    showOnScoreboard: boolean;
}

export class UpdateTeamDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @ApiModelProperty({required: true})
    name: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    maxMembersNumber: number;

    @IsOptional()
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.sponsor)
    @ApiModelProperty({required: true})
    school: string;

    @IsOptional()
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ValidateIf(x => !x.school)
    @ApiModelProperty({required: true})
    sponsor: string;
}
