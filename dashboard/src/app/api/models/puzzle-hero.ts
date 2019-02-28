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

export enum ValidationTypes {
    String = "string",
    Regex = "regex",
    Function = "function"
}

export interface PuzzleInfo {
    id: string;
    label: string;
    type: PuzzleTypes;
    completed: boolean;
    locked: boolean;
    description: { [lang: string]: string };
    dependsOn?: string;
}

export interface AdminPuzzleInfo {
    id: string;
    label: string;
    type: PuzzleTypes;
    description: { [lang: string]: string };
    dependsOn?: string;
    answer: string;
    validationType: ValidationTypes;
    startDate: number;
    endDate: number;
    puzzleValue: number;
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
