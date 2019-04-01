import * as fromApp from "../../../../../../store/app.reducers";
import { UpdateTrackActions, UpdateTrackActionTypes } from "./update-track.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UpdateTrackState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: UpdateTrackState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    puzzleHeroUpdateTrack: UpdateTrackState;
}

export function reducer(state = initialState, action: UpdateTrackActions) {
    switch (action.type) {
        case UpdateTrackActionTypes.ResetState:
            return initialState;
        case UpdateTrackActionTypes.UpdateTrack:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case UpdateTrackActionTypes.UpdateTrackSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case UpdateTrackActionTypes.UpdateTrackError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getPuzzleHeroUpdateTrackState = createFeatureSelector<State, UpdateTrackState>("puzzleHeroUpdateTrack");

export const getPuzzleHeroUpdateTrackLoading = createSelector(getPuzzleHeroUpdateTrackState, (state: UpdateTrackState) => state.loading);
export const getPuzzleHeroUpdateTrackError = createSelector(getPuzzleHeroUpdateTrackState, (state: UpdateTrackState) => state.error);
export const getPuzzleHeroUpdateTrackSuccess = createSelector(getPuzzleHeroUpdateTrackState, (state: UpdateTrackState) => state.success);
