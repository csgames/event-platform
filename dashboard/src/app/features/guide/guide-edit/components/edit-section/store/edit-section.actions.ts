import { Action } from "@ngrx/store";
import { EventGuide } from "src/app/api/models/guide";

export enum EditSectionActionTypes {
    EditSection = "[Edit Guide Section] Edit section",
    EditSectionSuccess = "[Edit Guide Section] Edit section success",
    EditSectionError = "[Edit Guide Section] Edit section error",
    ResetState = "[Edit Guide Section] Reset state"
}

export class EditSection implements Action {
    readonly type = EditSectionActionTypes.EditSection;

    constructor(public eventGuide: EventGuide) {}
}

export class EditSectionSuccess implements Action {
    readonly type = EditSectionActionTypes.EditSectionSuccess;
}

export class EditSectionError implements Action {
    readonly type = EditSectionActionTypes.EditSectionError;
}

export class ResetState implements Action {
    readonly type = EditSectionActionTypes.ResetState;
}

export type EditSectionActions =
    | ResetState
    | EditSectionSuccess
    | EditSectionError
    | EditSection;
