import { AppActions, AppActionTypes } from "./app.actions";
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { Attendee } from "../api/models/attendee";
import { Event } from "../api/models/event";

export interface GlobalState {
    currentAttendee: Attendee;
    events: Event[];
    currentEvent: Event;
}

export interface State {
    global: GlobalState;
}

export const appReducers: ActionReducerMap<State> = {
    global: globalReducer
};

export const initialState: GlobalState = {
    currentAttendee: null,
    events: [],
    currentEvent: null
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
        case AppActionTypes.EventsLoaded:
            return {
                ...state,
                events: action.events
            };
        case AppActionTypes.SetCurrentEvent:
            return {
                ...state,
                currentEvent: action.event
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

export const getEvents = createSelector(getGlobalState, (state: GlobalState) => state.events);

export const getCurrentEvent = createSelector(getGlobalState, (state: GlobalState) => state.currentEvent);
