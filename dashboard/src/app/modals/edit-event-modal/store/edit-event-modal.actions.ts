import { Action } from "@ngrx/store";
import { EventFormDto } from "../../../components/event-form/dto/event-form.dto";

export enum EditEventModalActionTypes {
    EditEvent = "[Edit event modal] Edit event",
    EditEventSuccess = "[Edit event modal] Edit event success",
    EditEventError = "[Edit event modal] Edit event error",

    ResetState = "[Edit event modal] Reset state"
}

export class EditEvent implements Action {
    readonly type = EditEventModalActionTypes.EditEvent;

    constructor(public eventFormDto: EventFormDto) {}
}

export class EditEventSuccess implements Action {
    readonly type = EditEventModalActionTypes.EditEventSuccess;
}

export class EditEventError implements Action {
    readonly type = EditEventModalActionTypes.EditEventError;
}

export class ResetState implements Action {
    readonly type = EditEventModalActionTypes.ResetState;
}

export type EditEventModalActions =
    | ResetState
    | EditEvent
    | EditEventSuccess
    | EditEventError;
