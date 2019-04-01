import * as fromApp from "../../../../../../store/app.reducers";
import { InfoPuzzleHeroActions, InfoPuzzleHeroActionTypes } from "./info-puzzle-hero.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface InfoPuzzleHeroState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: InfoPuzzleHeroState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    infoPuzzleHero: InfoPuzzleHeroState;
}

export function reducer(state = initialState, action: InfoPuzzleHeroActions): InfoPuzzleHeroState {
    switch (action.type) {
        case InfoPuzzleHeroActionTypes.ResetState:
            return initialState;
        case InfoPuzzleHeroActionTypes.ValidateAnswer:
            return {
                ...state,
                loading: true,
                error: false
            };

        case InfoPuzzleHeroActionTypes.ValidateAnswerSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };

        case InfoPuzzleHeroActionTypes.ValidateAnswerFailure:
            return {
                ...state,
                loading: false,
                success: false,
                error: true
            };
    }

    return state;
}

export const getInfoPuzzleHeroState = createFeatureSelector<State, InfoPuzzleHeroState>("infoPuzzleHero");

export const getInfoPuzzleHeroSuccess = createSelector(getInfoPuzzleHeroState, (state: InfoPuzzleHeroState) => state && state.success);
export const getInfoPuzzleHeroLoading = createSelector(getInfoPuzzleHeroState, (state: InfoPuzzleHeroState) => state && state.loading);
export const getInfoPuzzleHeroError = createSelector(getInfoPuzzleHeroState, (state: InfoPuzzleHeroState) => state && state.error);
