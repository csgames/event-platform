export enum TrackTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavenger = "scavenger",
    Sponsor = "sponsor"
}

export enum PuzzleTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavenger = "scavenger"
}

export interface Question {
    label: string;
    description: { [lang: string]: string };
    type: PuzzleTypes;
    validationType: string;
    answer: any;
    score: number;
}

export interface PuzzleInfo {
    id: string;
    label?: string;
    type?: PuzzleTypes;
    completed?: boolean;
    locked?: boolean;
    description?: { [lang: string]: string };
    dependsOn?: string;
    question?: Question;
}

export interface Track {
    _id: string;
    label: string;
    type: PuzzleTypes;
    puzzles: PuzzleInfo[];
}

export interface PuzzleHero {
    tracks: Track[];
    releaseDate: string | Date;
    endDate: string | Date;
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
