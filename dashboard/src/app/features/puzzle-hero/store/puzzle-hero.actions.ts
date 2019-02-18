import { Action } from "@ngrx/store";
import { Track } from "../../../api/models/puzzle-hero";

export enum PuzzleHeroActionTypes {
    LoadTracks = "[Puzzle Hero] Load tracks",
    TracksLoaded = "[Puzzle Hero] Tracks loaded",
    LoadTracksError = "[Puzzle Hero] Load tracks error",

    LoadStarredTracks = "[Puzzle Hero] Load starred tracks",
    StarredTracksLoaded = "[Puzzle Hero] Starred tracks loaded",
    StarTrack = "[Puzzle Hero] Star track"
}

export class LoadTracks implements Action {
    readonly type = PuzzleHeroActionTypes.LoadTracks;
}

export class TracksLoaded implements Action {
    readonly type = PuzzleHeroActionTypes.TracksLoaded;

    constructor(public tracks: Track[]) {}
}

export class LoadTracksError implements Action {
    readonly type = PuzzleHeroActionTypes.LoadTracksError;
}

export class LoadStarredTracks implements Action {
    readonly type = PuzzleHeroActionTypes.LoadStarredTracks;
}

export class StarredTracksLoaded implements Action {
    readonly type = PuzzleHeroActionTypes.StarredTracksLoaded;

    constructor(public starredTracks: string[]) {}
}

export class StarTrack {
    readonly type = PuzzleHeroActionTypes.StarTrack;

    constructor(public track: Track) {}
}

export type PuzzleHeroActions =
    | LoadTracks
    | TracksLoaded
    | LoadTracksError
    | LoadStarredTracks
    | StarredTracksLoaded
    | StarTrack;
