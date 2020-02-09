import { Template } from "../../../../../../api/models/template";
import * as fromApp from "../../../../../../store/app.reducers";
import { EventEmailTemplateSettingsActions, EventEmailTemplateSettingsActionTypes } from "./email-templates.actions";

export interface EventEmailTemplateSettingsState {
    loading: boolean;
    error: boolean;
    template: Template;
}

export const initialState: EventEmailTemplateSettingsState = {
    loading: false,
    error: false,
    template: null
};

export interface State extends fromApp.State {
    eventEmailTemplateSettings: EventEmailTemplateSettingsState;
}

export function reducer(state = initialState, action: EventEmailTemplateSettingsActions) {
    switch (action.type) {
        case EventEmailTemplateSettingsActionTypes.LoadTemplate:
            return {
                ...state,
                loading: true
            };
        case EventEmailTemplateSettingsActionTypes.TemplateLoaded:
            return {
                ...state,
                loading: false,
                template: action.payload
            };
        case EventEmailTemplateSettingsActionTypes.SaveTemplate:
            return {
                ...state,
                loading: true
            };
        case EventEmailTemplateSettingsActionTypes.TemplateSaved:
            return {
                ...state,
                loading: false
            };
        case EventEmailTemplateSettingsActionTypes.ResetState:
            return initialState;
    }

    return state;
}
