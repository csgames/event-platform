import { AppActions, AppActionTypes } from "./app.actions";
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { Attendee } from "../api/models/attendee";

export interface GlobalState {
    currentAttendee: Attendee;
}

export interface State {
    global: GlobalState;
}

export const appReducers: ActionReducerMap<State> = {
    global: globalReducer
};

export const initialState: GlobalState = {
    currentAttendee: null
};

export function globalReducer(state = initialState, action: AppActions): GlobalState {
    switch (action.type) {
        case AppActionTypes.CurrentAttendeeLoaded:
            return {
                ...state,
                currentAttendee: action.payload
            };
        case AppActionTypes.Logout:
            return {
                ...state,
                currentAttendee: null
            };
    }
    return state;
}

export const appMetaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getGlobalState = createFeatureSelector<State, GlobalState>("global");

export const getCurrentAttendee = createSelector(
    getGlobalState,
    (state: GlobalState) => state.currentAttendee
);

