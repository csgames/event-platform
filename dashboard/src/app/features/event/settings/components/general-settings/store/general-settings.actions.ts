import { Action } from "@ngrx/store";
import { EventFormDto } from "../../../../../../components/event-form/dto/event-form.dto";

export enum EventGeneralSettingsActionTypes {
    EditEvent = "[Event General Settings] Edit event",
    EditEventSuccess = "[Event General Settings] Edit event success",
    EditEventError = "[Event General Settings] Edit event error",

    ResetState = "[Event General Settings] Reset state"
}

export class EditEvent implements Action {
    readonly type = EventGeneralSettingsActionTypes.EditEvent;

    constructor(public eventFormDto: EventFormDto) {}
}

export class EditEventSuccess implements Action {
    readonly type = EventGeneralSettingsActionTypes.EditEventSuccess;
}

export class EditEventError implements Action {
    readonly type = EventGeneralSettingsActionTypes.EditEventError;
}

export class ResetState implements Action {
    readonly type = EventGeneralSettingsActionTypes.ResetState;
}

export type GeneralSettingsActions =
    | ResetState
    | EditEvent
    | EditEventSuccess
    | EditEventError;
