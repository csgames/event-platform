import { Action } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";
import { RegisterAttendeeFormDto } from "../../../components/register-attendee-form/dto/register-attendee-form.dto";

export enum DirectorsActionTypes {
    LoadDirectors = "[Directors] Load Directors",
    DirectorsLoaded = "[Directors] Directors loaded",
    AddDirector = "[Directors] Add Director"
}

export class LoadDirectors implements Action {
    readonly type = DirectorsActionTypes.LoadDirectors;
}

export class DirectorsLoaded implements Action {
    readonly type = DirectorsActionTypes.DirectorsLoaded;

    constructor(public payload: Attendee[]) {}
}

export class AddDirector implements Action {
    readonly type = DirectorsActionTypes.AddDirector;

    constructor(public payload: RegisterAttendeeFormDto) {}
}

export type DirectorsActions =
    | LoadDirectors
    | DirectorsLoaded
    | AddDirector;
