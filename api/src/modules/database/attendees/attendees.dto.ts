import { IsString, IsOptional, IsIn, IsNotEmpty, IsUrl } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateAttendeeDto {

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['cegep', 'bachelor', 'master', 'phd'])
    @ApiModelProperty({ required: true })
    degree: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['male', 'female', 'other', 'no_answer'])
    @ApiModelProperty({ required: true })
    gender: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['small', 'medium', 'large', 'x-large', '2x-large'])
    @ApiModelProperty({ required: true })
    tshirt: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    school: string;
}

export class UpdateAttendeeDto {

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsOptional()
    @IsString()
    @IsIn(['cegep', 'bachelor', 'master', 'phd'])
    @ApiModelProperty()
    degree: string;

    @IsOptional()
    @IsString()
    @IsIn(['male', 'female', 'other', 'no_answer'])
    @ApiModelProperty()
    gender: string;

    @IsOptional()
    @IsString()
    @IsIn(['small', 'medium', 'large', 'x-large', '2x-large'])
    @ApiModelProperty()
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    school: string;
}
