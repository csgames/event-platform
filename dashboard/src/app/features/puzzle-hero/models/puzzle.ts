export enum PuzzleTypes {
    Crypto = "crypto",
    Gaming = "gaming"
}

export interface PuzzleInfo {
    id: string;
    label: string;
    type: PuzzleTypes;
    completed: boolean;
    locked: boolean;
    dependsOn?: string;
}
