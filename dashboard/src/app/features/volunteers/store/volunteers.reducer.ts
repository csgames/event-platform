import * as fromApp from "src/app/store/app.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";
import { VolunteersActions, VolunteersActionTypes } from "./volunteers.actions";

export interface VolunteersState {
    attendees: Attendee[];
    loading: boolean;
}

const initialState: VolunteersState = {
    attendees: null,
    loading: false
};

export interface State extends fromApp.State {
    volunteers: VolunteersState;
}

export function reducer(state = initialState, action: VolunteersActions): VolunteersState {
    switch (action.type) {
        case VolunteersActionTypes.LoadVolunteers:
            return {
                ...state,
                loading: true
            };
        case VolunteersActionTypes.VolunteersLoaded:
            return {
                ...state,
                loading: false,
                attendees: action.payload
            };
        case VolunteersActionTypes.AddVolunteer:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export const getSponsorsState = createFeatureSelector<State, VolunteersState>("volunteers");

export const getAttendees = createSelector(getSponsorsState, (state: VolunteersState) => state.attendees);
export const getLoading = createSelector(getSponsorsState, (state: VolunteersState) => state.loading);
