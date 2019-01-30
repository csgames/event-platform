import { Team } from "src/app/api/models/team";
import * as fromApp from "src/app/store/app.reducers";
import { TeamActions, TeamActionTypes } from "./team.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Attendee } from "src/app/api/models/attendee";

export interface TeamState {
    currentTeam: Team;
    error: boolean;
    loading: boolean;
}

const initialState: TeamState = {
    currentTeam: null,
    error: false,
    loading: false
};

export interface State extends fromApp.State {
    team: TeamState;
}

export function reducer(state = initialState, action: TeamActions): TeamState {
    switch (action.type) {
        case TeamActionTypes.LoadTeam : 
            return {
                ...state,
                loading: true,
                error: false,
                currentTeam: null
            };
        case TeamActionTypes.LoadTeamSuccess:
            return {
                ...state,
                loading: false,
                currentTeam: action.payload
            };
        case TeamActionTypes.LoadTeamFailure: 
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
}

export const getTeamState = createFeatureSelector<State, TeamState>("team");

export const getTeamLoading = createSelector(getTeamState, (state: TeamState) => state.loading);

export const getTeamError = createSelector(getTeamState, (state: TeamState) => state.error);

export const getCurrentTeam = createSelector(getTeamState, (state: TeamState) => state.currentTeam);

export const getTeamGodparent = createSelector(
    getCurrentTeam, 
    (team: Team) => team && team.attendees.filter((attendee: Attendee) => attendee.role === "godfather")
);

export const getTeamAttendees = createSelector(
    getCurrentTeam, 
    (team: Team) => team && team.attendees.filter((attendee: Attendee) => 
    attendee.role === "captain" || attendee.role === "attendee")
);
