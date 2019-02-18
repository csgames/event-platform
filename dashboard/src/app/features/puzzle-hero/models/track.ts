import { PuzzleInfo, PuzzleTypes } from "./puzzle";

export interface Track {
    id: string;
    label: string;
    type: PuzzleTypes;
    puzzles: PuzzleInfo[];
}
