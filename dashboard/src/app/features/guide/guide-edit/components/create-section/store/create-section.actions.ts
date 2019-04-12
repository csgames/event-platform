import { Action } from "@ngrx/store";
import { SectionFormDto } from "../../section-form/dto/section-form.dto";

export enum CreateSectionActionTypes {
    CreateSection = "[Create Guide Section] Create section",
    CreateSectionSuccess = "[Create Guide Section] Create section success",
    CreateSectionError = "[Create Guide Section] Create section error",
    ResetState = "[Create Guide Section] Reset state"
}

export class CreateSection implements Action {
    readonly type = CreateSectionActionTypes.CreateSection;

    constructor(public sectionFormDto: SectionFormDto) {}
}

export class CreateSectionSuccess implements Action {
    readonly type = CreateSectionActionTypes.CreateSectionSuccess;
}

export class CreateSectionError implements Action {
    readonly type = CreateSectionActionTypes.CreateSectionError;
}

export class ResetState implements Action {
    readonly type = CreateSectionActionTypes.ResetState;
}

export type CreateSectionActions =
    | ResetState
    | CreateSectionSuccess
    | CreateSectionError
    | CreateSection;
