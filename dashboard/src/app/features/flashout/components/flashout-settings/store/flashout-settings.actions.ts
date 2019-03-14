import { Action } from "@ngrx/store";
import { FlashoutSettingsDto } from "../dto/flashout-settings.dto";
import { Event } from "../../../../../api/models/event";

export enum FlashoutSettingsActionTypes {
    SaveSettings = "[Flashout Settings] Save settings",
    SaveSettingsSuccess = "[Flashout Settings] Save settings success",
    SaveSettingsError = "[Flashout Settings] Save settings error",
    ResetState = "[Flashout Settings] Reset state"
}

export class SaveSettings implements Action {
    readonly type = FlashoutSettingsActionTypes.SaveSettings;

    constructor(public dto: FlashoutSettingsDto) { }
}

export class SaveSettingsSuccess implements Action {
    readonly type = FlashoutSettingsActionTypes.SaveSettingsSuccess;
}

export class SaveSettingsError implements Action {
    readonly type = FlashoutSettingsActionTypes.SaveSettingsError;
}

export class ResetState implements Action {
    readonly type = FlashoutSettingsActionTypes.ResetState;
}

export type FlashoutsSettingsActions =
    | SaveSettings
    | SaveSettingsSuccess
    | SaveSettingsError
    | ResetState;