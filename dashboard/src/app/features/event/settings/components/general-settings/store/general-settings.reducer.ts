import * as fromApp from "../../../../../../store/app.reducers";
import { GeneralSettingsActions, EventGeneralSettingsActionTypes } from "./general-settings.actions";

export interface EventGeneralSettingsState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: EventGeneralSettingsState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    eventSettings: EventGeneralSettingsState;
}

export function reducer(state = initialState, action: GeneralSettingsActions) {
    switch (action.type) {
        case EventGeneralSettingsActionTypes.EditEventSuccess:
            return {
                ...state,
                loading: false,
                success: true
            };
        case EventGeneralSettingsActionTypes.EditEventError:
            return {
                ...state,
                loading: false,
                error: true
            };
        case EventGeneralSettingsActionTypes.EditEvent:
            return {
                ...state,
                loading: true,
                error: false
            };
        case EventGeneralSettingsActionTypes.ResetState:
            return initialState;
    }

    return state;
}
