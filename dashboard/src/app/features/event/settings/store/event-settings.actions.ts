import { Action } from "@ngrx/store";
import { EventFormDto } from "../../../../components/event-form/dto/event-form.dto";

export enum EditEventModalActionTypes {
    EditEvent = "[Event settings] Edit event",
    EditEventSuccess = "[Event settings] Edit event success",
    EditEventError = "[Event settings] Edit event error",

    ResetState = "[Event settings] Reset state"
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

export type EventSettingsActions =
    | ResetState
    | EditEvent
    | EditEventSuccess
    | EditEventError;
