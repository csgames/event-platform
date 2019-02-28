import { Action } from "@ngrx/store";
import { Track } from "../../../../api/models/puzzle-hero";

export enum TracksActionTypes {
    LoadTracks = "[Puzzle Hero Tracks] Load tracks",
    TracksLoaded = "[Puzzle Hero Tracks] Tracks loaded",
    LoadTracksError = "[Puzzle Hero Tracks] Load tracks error",

    LoadStarredTracks = "[Puzzle Hero Tracks] Load starred tracks",
    StarredTracksLoaded = "[Puzzle Hero Tracks] Starred tracks loaded",
    StarTrack = "[Puzzle Hero Tracks] Star track"
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
