import { Action } from "@ngrx/store";
import { Template } from "../../../../../../api/models/template";

export enum EventEmailTemplateSettingsActionTypes {
    LoadTemplate = "[Event Email Template Settings] Load template",
    TemplateLoaded = "[Event Email Template Settings] Template loaded",
    SaveTemplate = "[Event Email Template Settings] Sage template",
    TemplateSaved = "[Event Email Template Settings] Template saved",

    ResetState = "[Event Email Template Settings] Reset state"
}

export class LoadTemplate implements Action {
    readonly type = EventEmailTemplateSettingsActionTypes.LoadTemplate;

    constructor(public payload: string) {}
}

export class TemplateLoaded implements Action {
    readonly type = EventEmailTemplateSettingsActionTypes.TemplateLoaded;

    constructor(public payload: Template) {}
}

export class SaveTemplate implements Action {
    readonly type = EventEmailTemplateSettingsActionTypes.SaveTemplate;

    constructor(public payload: { type: string; html: string }) {}
}

export class TemplateSaved implements Action {
    readonly type = EventEmailTemplateSettingsActionTypes.TemplateSaved;
}

export class ResetState implements Action {
    readonly type = EventEmailTemplateSettingsActionTypes.ResetState;
}

export type EventEmailTemplateSettingsActions =
    | LoadTemplate
    | TemplateLoaded
    | SaveTemplate
    | TemplateSaved
    | ResetState;
