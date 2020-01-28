import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";

export class CreateFlashOutDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    videoId: string;

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    school: string;
}

export class VoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    _id: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    @ApiProperty({ required: true })
    rating: number;
}

export class VotesFlashOutDto {
    @IsArray()
    @ArrayUnique()
    @ValidateNested({ each: true })
    @Type(() => VoteDto)
    @ApiProperty({ required: true })
    votes: VoteDto[];
}
