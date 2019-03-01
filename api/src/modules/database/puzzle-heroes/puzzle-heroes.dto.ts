import { IsIn, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateQuestionDto } from '../questions/questions.dto';

export class CreatePuzzleHeroDto {
    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class CreateTrackDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger", "sponsor"])
    type: string;

    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class UpdateTrackDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger", "sponsor"])
    type: string;

    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class CreatePuzzleDto extends CreateQuestionDto {
    @IsOptional()
    @IsMongoId()
    dependsOn: string;
}
