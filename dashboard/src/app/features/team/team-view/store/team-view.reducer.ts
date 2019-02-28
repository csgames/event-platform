import { Team } from "src/app/api/models/team";
import * as fromApp from "src/app/store/app.reducers";
import { TeamViewActions, TeamViewActionTypes } from "./team-view.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Attendee } from "src/app/api/models/attendee";

export interface TeamViewState {
    currentTeam: Team;
    error: boolean;
    loading: boolean;
}

const initialState: TeamViewState = {
    currentTeam: null,
    error: false,
    loading: false
};

export interface State extends fromApp.State {
    teamView: TeamViewState;
}

export function reducer(state = initialState, action: TeamViewActions): TeamViewState {
    switch (action.type) {
        case TeamViewActionTypes.LoadTeam :
            return {
                ...state,
                loading: true,
                error: false
            };
        case TeamViewActionTypes.LoadTeamSuccess:
            return {
                ...state,
                loading: false,
                currentTeam: action.payload
            };
        case TeamViewActionTypes.LoadTeamFailure:
            return {
                ...state,
                error: true,
                loading: false
            };
        case TeamViewActionTypes.AddTeamMember:
        case TeamViewActionTypes.AddTeamGodparent:
            return {
                ...state,
                loading: true
            };
        case TeamViewActionTypes.AddMemberFailure:
            return {
                ...state,
                loading: false
            };
        case TeamViewActionTypes.UpdateTeamNameFailure:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export const getTeamState = createFeatureSelector<State, TeamViewState>("teamView");
export const getGlobalState = createFeatureSelector<State, fromApp.GlobalState>("global");

export const getCurrentAttendee = createSelector(getGlobalState, (state: fromApp.GlobalState) => state.currentAttendee);

export const getTeamLoading = createSelector(getTeamState, (state: TeamViewState) => state.loading);

export const getTeamError = createSelector(getTeamState, (state: TeamViewState) => state.error);

export const getCurrentTeam = createSelector(getTeamState, (state: TeamViewState) => state.currentTeam);

export const getTeamGodparent = createSelector(
    getCurrentTeam,
    (team: Team) => team && team.attendees.filter((attendee: Attendee) => attendee.role === "godparent")
);

export const getTeamAttendees = createSelector(
    getCurrentTeam,
    (team: Team) => team && team.attendees.filter((attendee: Attendee) =>
        attendee.role === "captain" || attendee.role === "attendee")
);
