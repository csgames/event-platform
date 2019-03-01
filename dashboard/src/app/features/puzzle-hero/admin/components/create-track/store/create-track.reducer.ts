import * as fromApp from "../../../../../../store/app.reducers";
import { CreateTrackActions, CreateTrackActionTypes } from "./create-track.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CreateTrackState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: CreateTrackState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    puzzleHeroCreateTrack: CreateTrackState;
}

export function reducer(state = initialState, action: CreateTrackActions) {
    switch (action.type) {
        case CreateTrackActionTypes.ResetState:
            return initialState;
        case CreateTrackActionTypes.CreateTrack:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case CreateTrackActionTypes.CreateTrackSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case CreateTrackActionTypes.CreateTrackError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getPuzzleHeroCreateTrackState = createFeatureSelector<State, CreateTrackState>("puzzleHeroCreateTrack");

export const getPuzzleHeroCreateTrackLoading = createSelector(getPuzzleHeroCreateTrackState, (state: CreateTrackState) => state.loading);
export const getPuzzleHeroCreateTrackError = createSelector(getPuzzleHeroCreateTrackState, (state: CreateTrackState) => state.error);
export const getPuzzleHeroCreateTrackSuccess = createSelector(getPuzzleHeroCreateTrackState, (state: CreateTrackState) => state.success);
