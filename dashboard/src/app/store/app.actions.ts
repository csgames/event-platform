import { Action } from "@ngrx/store";

export enum AppActionTypes {
    LoadCurrentUser = "[App] Load current user"
}

export class LoadCurrentUser implements Action {
    readonly type = AppActionTypes.LoadCurrentUser;
}

export type AppActions =
    | LoadCurrentUser;
