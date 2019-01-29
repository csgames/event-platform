import { Action } from "@ngrx/store";

export enum ProfileSettingActionTypes {
    LoadModal = "[ProfileSetting] Load modal"
}

export class LoadModal implements Action {
    readonly type = ProfileSettingActionTypes.LoadModal;
}

export type ProfileSettingActions =
    | LoadModal;
