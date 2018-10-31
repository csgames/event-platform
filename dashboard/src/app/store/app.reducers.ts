import { AppActions, AppActionTypes } from "./app.actions";
import { ActionReducerMap, createFeatureSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface GlobalState {
    currentUser: number;
}

export interface State {
    global: GlobalState;
}

export const appReducers: ActionReducerMap<State> = {
    global: globalReducer
};

export const initialState: GlobalState = {
    currentUser: 0
};

export function globalReducer(state = initialState, action: AppActions): GlobalState {
    switch (action.type) {
        case AppActionTypes.LoadCurrentUser:
            return {
                ...state,
                currentUser: 3
            };
    }
    return state;
}

export const appMetaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getGlobalState = createFeatureSelector<State, GlobalState>("global");
