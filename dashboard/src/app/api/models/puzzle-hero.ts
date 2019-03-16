import { Question, QuestionTypes } from "./question";

export enum TrackTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavenger = "scavenger",
    Sponsor = "sponsor"
}

export interface PuzzleInfo {
    id: string;
    label?: string;
    type?: QuestionTypes;
    completed?: boolean;
    locked?: boolean;
    description?: { [lang: string]: string };
    dependsOn?: string;
    question?: Question;
}

export interface Track {
    _id: string;
    label: string;
    type: TrackTypes;
    puzzles: PuzzleInfo[];
    releaseDate: string;
    endDate: string;
}

export interface PuzzleHero {
    tracks?: Track[];
    open: boolean;
    releaseDate: string | Date;
    endDate: string | Date;
    scoreboardEndDate: string | Date;
}

export interface PuzzleHeroInfo {
    open: boolean;
    scoreboardOpen: boolean;
}

export interface Score {
    teamId: string;
    teamName: string;
    schoolName: string;
    score: number;
}

export interface TeamSeries {
    name: string;
    series: { value: number, name: Date }[];
}
