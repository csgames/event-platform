import * as fromApp from "../../../../store/app.reducers";
import { TracksActions, TracksActionTypes } from "./tracks.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Track } from "../../../../api/models/puzzle-hero";

export interface TracksState {
    tracks: Track[];
    starredTracks: string[];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    puzzleHeroTracks: TracksState;
}

export const initialState: TracksState = {
    tracks: [],
    starredTracks: [],
    loading: false,
    error: false
};

export function reducer(state = initialState, action: TracksActions): TracksState {
    switch (action.type) {
        case TracksActionTypes.LoadTracks:
            return {
                ...state,
                loading: true,
                tracks: []
            };

        case TracksActionTypes.TracksLoaded:
            return {
                ...state,
                loading: false,
                tracks: action.tracks
            };

        case TracksActionTypes.LoadTracksError:
            return {
                ...state,
                loading: false,
                tracks: [],
                error: false
            };

        case TracksActionTypes.StarredTracksLoaded:
            return {
                ...state,
                starredTracks: action.starredTracks
            };
    }

    return state;
}

export const getTracksState = createFeatureSelector<State, TracksState>("puzzleHeroTracks");

export const getPuzzleHeroTracks = createSelector(getTracksState, (state: TracksState) => state.tracks);

export const getPuzzleHeroStarredTracks = createSelector(getTracksState,
    (state: TracksState) => state.tracks.filter(t => state.starredTracks.includes(t._id)));
export const getPuzzleHeroNotStarredTracks = createSelector(getTracksState,
    (state: TracksState) => state.tracks.filter(t => !state.starredTracks.includes(t._id)));

export const getPuzzleHeroLoading = createSelector(getTracksState, (state: TracksState) => state.loading);
export const getPuzzleHeroError = createSelector(getTracksState, (state: TracksState) => state.error);
