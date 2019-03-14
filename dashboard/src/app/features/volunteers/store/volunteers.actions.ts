import { Action } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";
import { RegisterAttendeeFormDto } from "../../../components/register-attendee-form/dto/register-attendee-form.dto";

export enum VolunteersActionTypes {
    LoadVolunteers = "[Volunteers] Load Volunteers",
    VolunteersLoaded = "[Volunteers] Volunteers loaded",
    AddVolunteer = "[Volunteers] Add volunteer"
}

export class LoadVolunteers implements Action {
    readonly type = VolunteersActionTypes.LoadVolunteers;
}

export class VolunteersLoaded implements Action {
    readonly type = VolunteersActionTypes.VolunteersLoaded;

    constructor(public payload: Attendee[]) {}
}

export class AddVolunteer implements Action {
    readonly type = VolunteersActionTypes.AddVolunteer;

    constructor(public payload: RegisterAttendeeFormDto) {}
}

export type VolunteersActions =
    | LoadVolunteers
    | VolunteersLoaded
    | AddVolunteer;
