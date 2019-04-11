import { Action } from "@ngrx/store";
import { EventFormDto } from "../../../components/event-form/dto/event-form.dto";

export enum CreateEventModalActionTypes {
    CreateEvent = "[Create event modal] Create event",
    CreateEventSuccess = "[Create event modal] Create event success",
    CreateEventError = "[Create event modal] Create event error",

    ResetState = "[Create event modal] Reset state"
}

export class CreateEvent implements Action {
    readonly type = CreateEventModalActionTypes.CreateEvent;

    constructor(public eventFormDto: EventFormDto) {}
}

export class CreateEventSuccess implements Action {
    readonly type = CreateEventModalActionTypes.CreateEventSuccess;
}

export class CreateEventError implements Action {
    readonly type = CreateEventModalActionTypes.CreateEventError;
}

export class ResetState implements Action {
    readonly type = CreateEventModalActionTypes.ResetState;
}

export type CreateEventModalActions =
    | ResetState
    | CreateEvent
    | CreateEventSuccess
    | CreateEventError;
