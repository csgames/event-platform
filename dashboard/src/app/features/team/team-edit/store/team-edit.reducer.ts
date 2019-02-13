import * as fromApp from "../../../../store/app.reducers";
import { TeamEditActions, TeamEditActionTypes } from "./team-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Team } from "../../../../api/models/team";
import { School } from "../../../../api/models/school";

export interface TeamEditState {
    loading: boolean;
    error: boolean;
    teams: Team[];
    schools: School[];
}

export const initialState: TeamEditState = {
    loading: false,
    error: false,
    teams: [],
    schools: []
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

        case TeamEditActionTypes.SchoolsLoaded:
            return {
                ...state,
                schools: action.schools
            };

        case TeamEditActionTypes.AddTeam:
            return {
                ...state,
                loading: true
            };

        case TeamEditActionTypes.AddTeamError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }
    return state;
}

export const getTeamEditState = createFeatureSelector<State, TeamEditState>("teamEdit");

export const getTeamEditLoading = createSelector(getTeamEditState, (state: TeamEditState) => state.loading);
export const getTeamEditError = createSelector(getTeamEditState, (state: TeamEditState) => state.error);
export const getTeamEditTeams = createSelector(getTeamEditState, (state: TeamEditState) => state.teams);
export const getTeamSchools = createSelector(getTeamEditState, (state: TeamEditState) => state.schools);
