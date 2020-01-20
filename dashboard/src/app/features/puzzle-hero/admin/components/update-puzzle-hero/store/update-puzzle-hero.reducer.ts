import * as fromApp from "../../../../../../store/app.reducers";
import { UpdatePuzzleActions, UpdatePuzzleActionTypes } from "./update-puzzle-hero.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UpdatePuzzleState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: UpdatePuzzleState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    puzzleHeroUpdatePuzzle: UpdatePuzzleState;
}

export function reducer(state = initialState, action: UpdatePuzzleActions) {
    switch (action.type) {
        case UpdatePuzzleActionTypes.ResetState:
            return initialState;
        case UpdatePuzzleActionTypes.UpdatePuzzle:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case UpdatePuzzleActionTypes.UpdatePuzzleSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case UpdatePuzzleActionTypes.UpdatePuzzleError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getPuzzleHeroUpdatePuzzleState = createFeatureSelector<State, UpdatePuzzleState>("puzzleHeroUpdatePuzzle");

export const getPuzzleHeroUpdatePuzzleLoading = createSelector(getPuzzleHeroUpdatePuzzleState, (state: UpdatePuzzleState) => state.loading);
export const getPuzzleHeroUpdatePuzzleError = createSelector(getPuzzleHeroUpdatePuzzleState, (state: UpdatePuzzleState) => state.error);
export const getPuzzleHeroUpdatePuzzleSuccess = createSelector(getPuzzleHeroUpdatePuzzleState, (state: UpdatePuzzleState) => state.success);
