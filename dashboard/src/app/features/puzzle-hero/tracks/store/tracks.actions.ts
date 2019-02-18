import { Action } from "@ngrx/store";
import { Track } from "../models/track";

export enum TracksActionTypes {
    LoadTracks = "[Puzzle Hero] Load tracks",
    TracksLoaded = "[Puzzle Hero] Tracks loaded",
    LoadTracksError = "[Puzzle Hero] Load tracks error",

    LoadStarredTracks = "[Puzzle Hero] Load starred tracks",
    StarredTracksLoaded = "[Puzzle Hero] Starred tracks loaded",
    StarTrack = "[Puzzle Hero] Star track"
}

export class LoadTracks implements Action {
    readonly type = TracksActionTypes.LoadTracks;
}

export class TracksLoaded implements Action {
    readonly type = TracksActionTypes.TracksLoaded;

    constructor(public tracks: Track[]) {}
}

export class LoadTracksError implements Action {
    readonly type = TracksActionTypes.LoadTracksError;
}

export class LoadStarredTracks implements Action {
    readonly type = TracksActionTypes.LoadStarredTracks;
}

export class StarredTracksLoaded implements Action {
    readonly type = TracksActionTypes.StarredTracksLoaded;

    constructor(public starredTracks: string[]) {}
}

export class StarTrack {
    readonly type = TracksActionTypes.StarTrack;

    constructor(public track: Track) {}
}

export type TracksActions =
    | LoadTracks
    | TracksLoaded
    | LoadTracksError
    | LoadStarredTracks
    | StarredTracksLoaded
    | StarTrack;
