import { PuzzleHero } from "../../../../api/models/puzzle-hero";
import * as fromApp from "../../../../store/app.reducers";
import { PuzzleAdminActions, PuzzleAdminActionTypes } from "./puzzle-admin.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface PuzzleAdminState {
    loading: boolean;
    error: boolean;
    puzzleHero: PuzzleHero;
}

export const initialState: PuzzleAdminState = {
    loading: false,
    error: false,
    puzzleHero: null
};

export interface State extends fromApp.State {
    puzzleHeroAdmin: PuzzleAdminState;
}

export function reducer(state = initialState, action: PuzzleAdminActions) {
    switch (action.type) {
        case PuzzleAdminActionTypes.LoadPuzzleHero:
            return {
                ...state,
                loading: true
            };
        case PuzzleAdminActionTypes.LoadPuzzleHeroError:
            return {
                ...state,
                loading: false,
                error: true
            };
        case PuzzleAdminActionTypes.PuzzleHeroLoaded:
            return {
                ...state,
                loading: false,
                error: false,
                puzzleHero: action.puzzleHero
            };
    }

    return state;
}


export const getPuzzleHeroAdminState = createFeatureSelector<State, PuzzleAdminState>("puzzleHeroAdmin");

export const getPuzzleHeroAdminLoading = createSelector(getPuzzleHeroAdminState, (state: PuzzleAdminState) => state.loading);
export const getPuzzleHeroAdminError = createSelector(getPuzzleHeroAdminState, (state: PuzzleAdminState) => state.error);
export const getPuzzleHeroAdminPuzzleHero = createSelector(getPuzzleHeroAdminState, (state: PuzzleAdminState) => state.puzzleHero);
