import * as fromApp from "../../../store/app.reducers";
import { PuzzleHeroActions, PuzzleHeroActionTypes } from "./puzzle-hero.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Track } from "../../../api/models/puzzle-hero";

export interface PuzzleHeroState {
    tracks: Track[];
    starredTracks: string[];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    puzzleHero: PuzzleHeroState;
}

export const initialState: PuzzleHeroState = {
    tracks: [],
    starredTracks: [],
    loading: false,
    error: false
};

export function reducer(state = initialState, action: PuzzleHeroActions): PuzzleHeroState {
    switch (action.type) {
        case PuzzleHeroActionTypes.LoadTracks:
            return {
                ...state,
                loading: true,
                tracks: []
            };

        case PuzzleHeroActionTypes.TracksLoaded:
            return {
                ...state,
                loading: false,
                tracks: action.tracks
            };

        case PuzzleHeroActionTypes.LoadTracksError:
            return {
                ...state,
                loading: false,
                tracks: [],
                error: false
            };

        case PuzzleHeroActionTypes.StarredTracksLoaded:
            return {
                ...state,
                starredTracks: action.starredTracks
            };
    }

    return state;
}

export const getPuzzleHeroState = createFeatureSelector<State, PuzzleHeroState>("puzzleHero");

export const getPuzzleHeroTracks = createSelector(getPuzzleHeroState, (state: PuzzleHeroState) => state.tracks);

export const getPuzzleHeroStarredTracks = createSelector(getPuzzleHeroState,
    (state: PuzzleHeroState) => state.tracks.filter(t => state.starredTracks.includes(t._id)));
export const getPuzzleHeroNotStarredTracks = createSelector(getPuzzleHeroState,
    (state: PuzzleHeroState) => state.tracks.filter(t => !state.starredTracks.includes(t._id)));

export const getPuzzleHeroLoading = createSelector(getPuzzleHeroState, (state: PuzzleHeroState) => state.loading);
export const getPuzzleHeroError = createSelector(getPuzzleHeroState, (state: PuzzleHeroState) => state.error);
