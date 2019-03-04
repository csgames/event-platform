import * as fromApp from "../../../../../../store/app.reducers";
import { PuzzleHeroSettingsActions, PuzzleHeroSettingsActionTypes } from "./puzzle-hero-settings.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface PuzzleHeroSettingsState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: PuzzleHeroSettingsState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    puzzleHeroSettings: PuzzleHeroSettingsState;
}

export function reducer(state = initialState, action: PuzzleHeroSettingsActions): PuzzleHeroSettingsState {
    switch (action.type) {
        case PuzzleHeroSettingsActionTypes.ResetState:
            return initialState;
        case PuzzleHeroSettingsActionTypes.SaveSettings:
            return {
                ...state,
                loading: true,
                error: false
            };
        case PuzzleHeroSettingsActionTypes.SaveSettingsSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case PuzzleHeroSettingsActionTypes.SaveSettingsError:
            return {
                ...state,
                success: false,
                error: true,
                loading: false
            };
    }

    return state;
}

export const getPuzzleHeroSettingsState = createFeatureSelector<State, PuzzleHeroSettingsState>("puzzleHeroSettings");

export const getPuzzleHeroSettingsLoading = createSelector(getPuzzleHeroSettingsState, (state: PuzzleHeroSettingsState) => state.loading);
export const getPuzzleHeroSettingsError = createSelector(getPuzzleHeroSettingsState, (state: PuzzleHeroSettingsState) => state.error);
export const getPuzzleHeroSettingsSuccess = createSelector(getPuzzleHeroSettingsState, (state: PuzzleHeroSettingsState) => state.success);
