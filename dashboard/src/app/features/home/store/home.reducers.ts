import { Team } from "../providers/home.service";
import { HomeActions, HomeActionTypes } from "./home.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface HomeState {
    teams: Team[];
    loading: boolean;
    error: boolean;
}

export interface State {
    home: HomeState;
}

const initialState: HomeState = {
    teams: [],
    loading: false,
    error: false
};

export function reducer(state = initialState, action: HomeActions) {
    switch (action.type) {
        case HomeActionTypes.LoadTeams:
            return {
                ...state,
                loading: true
            };
        case HomeActionTypes.LoadTeamsSuccess:
            return {
                ...state,
                loading: false,
                teams: action.teams
            };
        case HomeActionTypes.LoadTeamsFailure:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getHomeState = createFeatureSelector<State, HomeState>("home");

export const getLoading = createSelector(getHomeState, state => state.loading);
export const getTeams = createSelector(getHomeState, state => state.teams);
export const getError = createSelector(getHomeState, state => state.error);
