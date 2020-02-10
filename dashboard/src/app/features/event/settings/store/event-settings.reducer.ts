import * as fromApp from "../../../../store/app.reducers";
import * as fromGeneralSetting from "../components/general-settings/store/general-settings.reducer";
import * as fromEmailTemplateSetting from "../components/email-templates/store/email-templates.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { EventEmailTemplateSettingsState } from "../components/email-templates/store/email-templates.reducer";
import { EventGeneralSettingsState } from "../components/general-settings/store/general-settings.reducer";

export interface EventSettingsState {
    generalSetting: EventGeneralSettingsState;
    emailTemplatesSetting: EventEmailTemplateSettingsState;
}

export interface State extends fromApp.State {
    eventSettings: EventSettingsState;
}

export const eventSettingsReducers: ActionReducerMap<EventSettingsState> = {
    generalSetting: fromGeneralSetting.reducer,
    emailTemplatesSetting: fromEmailTemplateSetting.reducer
};

export const getEventSettingsState = createFeatureSelector<State, EventSettingsState>("eventSettings");

// Places base-list
export const getGeneralSettingsState = createSelector(getEventSettingsState, (state: EventSettingsState) => state.generalSetting);
export const getEmailTemplatesSettingsState =
    createSelector(getEventSettingsState, (state: EventSettingsState) => state.emailTemplatesSetting);

export function selectGeneralSettings(selector: (state: fromGeneralSetting.EventGeneralSettingsState) => any) {
    return select(createSelector(getGeneralSettingsState, selector));
}
export function selectEmailTemplatesSettings(selector: (state: fromEmailTemplateSetting.EventEmailTemplateSettingsState) => any) {
    return select(createSelector(getEmailTemplatesSettingsState, selector));
}
