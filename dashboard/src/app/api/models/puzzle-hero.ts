export enum TrackTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavender = "scavenger",
    Sponsor = "sponsor"
}

export enum PuzzleTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavender = "scavenger"
}

export interface PuzzleInfo {
    id: string;
    label: string;
    type: PuzzleTypes;
    completed: boolean;
    locked: boolean;
    dependsOn?: string;
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
