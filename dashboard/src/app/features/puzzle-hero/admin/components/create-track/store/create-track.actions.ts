import { Action } from "@ngrx/store";
import { TrackFormDto } from "../../track-form/dto/track-form.dto";

export enum CreateTrackActionTypes {
    CreateTrack = "[Create Puzzle Hero Track] Create track",
    CreateTrackSuccess = "[Create Puzzle Hero Track] Create track success",
    CreateTrackError = "[Create Puzzle Hero Track] Create track error",

    ResetState = "[Create Puzzle Hero Track] Reset state"
}

export class CreateTrack implements Action {
    readonly type = CreateTrackActionTypes.CreateTrack;

    constructor(public trackFormDto: TrackFormDto) {}
}

export class CreateTrackSuccess implements Action {
    readonly type = CreateTrackActionTypes.CreateTrackSuccess;
}

export class CreateTrackError implements Action {
    readonly type = CreateTrackActionTypes.CreateTrackError;
}

export class ResetState implements Action {
    readonly type = CreateTrackActionTypes.ResetState;
}

export type CreateTrackActions =
    | ResetState
    | CreateTrackSuccess
    | CreateTrackError
    | CreateTrack;


