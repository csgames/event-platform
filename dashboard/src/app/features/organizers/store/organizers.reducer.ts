import * as fromApp from "src/app/store/app.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";
import { OrganizersActions, OrganizersActionTypes } from "./organizers.actions";

export interface OrganizersState {
    attendees: Attendee[];
    loading: boolean;
}

const initialState: OrganizersState = {
    attendees: null,
    loading: false
};

export interface State extends fromApp.State {
    organizers: OrganizersState;
}

export function reducer(state = initialState, action: OrganizersActions): OrganizersState {
    switch (action.type) {
        case OrganizersActionTypes.LoadAdmins:
            return {
                ...state,
                loading: true
            };
        case OrganizersActionTypes.AdminsLoaded:
            return {
                ...state,
                loading: false,
                attendees: action.payload
            };
        case OrganizersActionTypes.AddAdmin:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export const getSponsorsState = createFeatureSelector<State, OrganizersState>("organizers");

export const getAttendees = createSelector(getSponsorsState, (state: OrganizersState) => state.attendees);
export const getLoading = createSelector(getSponsorsState, (state: OrganizersState) => state.loading);
