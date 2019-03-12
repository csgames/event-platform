import { Action } from "@ngrx/store";
import { PuzzleHeroSettingsDto } from "../dto/puzzle-hero-settings.dto";

export enum PuzzleHeroSettingsActionTypes {
    SaveSettings = "[Puzzle Hero Settings] Save settings",
    SaveSettingsSuccess = "[Puzzle Hero Settings] Save settings success",
    SaveSettingsError = "[Puzzle Hero Settings] Save settings error",
    ResetState = "[Puzzle Hero Settings] Reset state"
}

export class SaveSettings implements Action {
    readonly type = PuzzleHeroSettingsActionTypes.SaveSettings;

    constructor(public puzzleHeroSettingsDto: PuzzleHeroSettingsDto) {}
}

export class SaveSettingsSuccess implements Action {
    readonly type = PuzzleHeroSettingsActionTypes.SaveSettingsSuccess;
}

export class SaveSettingsError implements Action {
    readonly type = PuzzleHeroSettingsActionTypes.SaveSettingsError;
}

export class ResetState implements Action {
    readonly type = PuzzleHeroSettingsActionTypes.ResetState;
}

export type PuzzleHeroSettingsActions =
    | SaveSettings
    | SaveSettingsSuccess
    | SaveSettingsError
    | ResetState;


