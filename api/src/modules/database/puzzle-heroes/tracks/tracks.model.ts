import { PuzzleGraphNodes } from '../puzzle-graph-nodes/puzzle-graph.nodes.model';

export enum TrackTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavender = "scavenger",
    Sponsor = "sponsor"
}

export interface Tracks {
    label: string;
    type: TrackTypes;
    puzzles: PuzzleGraphNodes[];
    releaseDate: Date;
}
