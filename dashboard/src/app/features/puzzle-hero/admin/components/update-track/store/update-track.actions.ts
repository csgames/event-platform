import { Action } from "@ngrx/store";
import { TrackFormDto } from "../../track-form/dto/track-form.dto";

export enum UpdateTrackActionTypes {
    UpdateTrack = "[Update Puzzle Hero Track] Update track",
    UpdateTrackSuccess = "[Update Puzzle Hero Track] Update track success",
    UpdateTrackError = "[Update Puzzle Hero Track] Update track error",

    ResetState = "[Update Puzzle Hero Track] Reset state"
}

export class UpdateTrack implements Action {
    readonly type = UpdateTrackActionTypes.UpdateTrack;

    constructor(public id: string, public trackFormDto: TrackFormDto) {}
}

export class UpdateTrackSuccess implements Action {
    readonly type = UpdateTrackActionTypes.UpdateTrackSuccess;
}

export class UpdateTrackError implements Action {
    readonly type = UpdateTrackActionTypes.UpdateTrackError;
}

export class ResetState implements Action {
    readonly type = UpdateTrackActionTypes.ResetState;
}

export type UpdateTrackActions =
    | ResetState
    | UpdateTrackSuccess
    | UpdateTrackError
    | UpdateTrack;


