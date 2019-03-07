import { CreateQuestionDto } from "./question";

export interface CreateTrackDto {
    label: string;
    type: string;
    releaseDate: Date;
    endDate: Date;
}

export interface UpdateTrackDto {
    label: string;
    type: string;
    releaseDate: Date;
    endDate: Date;
}


export interface CreatePuzzleDto extends CreateQuestionDto {
    dependsOn: string;
}