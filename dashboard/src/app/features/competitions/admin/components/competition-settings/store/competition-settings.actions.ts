import { Action } from "@ngrx/store";
import { CompetitionSettingsDto } from "../dto/competition-settings.dto";

export enum CompetitionSettingsActionTypes {
    SaveCompetitionSettings = "[Competition Settings] Save competition settings",
    SaveCompetitionSettingsSuccess = "[Competition Settings] Save competition settings success",
    SaveCompetitionSettingsError = "[Competition Settings] Save competition settings error",
    ResetCompetitionSettingsState = "[Competition Settings] Reset Competition Settings State"
}

export class SaveCompetitionSettings implements Action {
    readonly type = CompetitionSettingsActionTypes.SaveCompetitionSettings;

    constructor(public dto: CompetitionSettingsDto) {}
}

export class SaveCompetitionSettingsSuccess implements Action {
    readonly type = CompetitionSettingsActionTypes.SaveCompetitionSettingsSuccess;
}

export class SaveCompetitionSettingsError implements Action {
    readonly type = CompetitionSettingsActionTypes.SaveCompetitionSettingsError;
}

export class ResetCompetitionSettingsState implements Action {
    readonly type = CompetitionSettingsActionTypes.ResetCompetitionSettingsState;
}

export type CompetitionSettingsActions =
    | SaveCompetitionSettings
    | SaveCompetitionSettingsSuccess
    | SaveCompetitionSettingsError
    | ResetCompetitionSettingsState;
