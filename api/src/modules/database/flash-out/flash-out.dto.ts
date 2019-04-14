import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";

export class CreateFlashOutDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    videoId: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ required: true })
    school: string;
}

export class VoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    _id: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    rating: number;
}

export class VotesFlashOutDto {
    @IsArray()
    @ArrayUnique()
    @ValidateNested({ each: true })
    @Type(() => VoteDto)
    @ApiModelProperty({ required: true })
    votes: VoteDto[];
}
