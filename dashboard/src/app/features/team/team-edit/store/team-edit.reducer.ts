import * as fromApp from "../../../../store/app.reducers";
import { TeamEditActions, TeamEditActionTypes } from "./team-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Team } from "../../../../api/models/team";

export interface TeamEditState {
    loading: boolean;
    error: boolean;
    teams: Team[];
}

export const initialState: TeamEditState = {
    loading: false,
    error: false,
    teams: []
};

export interface State extends fromApp.State {
    teamEdit: TeamEditState;
}

export function reducer(state = initialState, action: TeamEditActions): TeamEditState {
    switch (action.type) {
        case TeamEditActionTypes.LoadTeams:
            return {
                ...state,
                error: false,
                loading: true,
                teams: []
            };
        case TeamEditActionTypes.TeamsLoaded:
            return {
                ...state,
                error: false,
                loading: false,
                teams: action.teams
            };
        case TeamEditActionTypes.LoadTeamsFailure:
            return {
                ...state,
                error: true,
                loading: false,
                teams: []
            };
    }
    return state;
}

export const getTeamEditState = createFeatureSelector<State, TeamEditState>("teamEdit");

export const getTeamEditLoading = createSelector(getTeamEditState, (state: TeamEditState) => state.loading);
export const getTeamEditError = createSelector(getTeamEditState, (state: TeamEditState) => state.error);
export const getTeamEditTeams = createSelector(getTeamEditState, (state: TeamEditState) => state.teams);
