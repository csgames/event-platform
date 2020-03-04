import { Action } from "@ngrx/store";
import { QuestionFormDto } from "../../../../../../components/question-form/dto/question-form.dto";
import { AnswerData } from "../../../../../../api/models/puzzle-hero";

export enum AnswerActionTypes {
    LoadData = "[Answer] Load data",
    DataLoaded = "[Answer] Data loaded",
    AcceptAnswer = "[Answer] Accept answer",
    AnswerAccepted = "[Answer] Answer accepted",
    RefuseAnswer = "[Answer] Refuse answer",
    AnswerRefused = "[Answer] Answer refused",
    ResetState = "[Answer] Reset state"
}

export class LoadData implements Action {
    readonly type = AnswerActionTypes.LoadData;

    constructor(public puzzleId: string, public answerId: string) {}
}

export class DataLoaded implements Action {
    readonly type = AnswerActionTypes.DataLoaded;

    constructor(public data: AnswerData) {}
}

export class AcceptAnswer implements Action {
    readonly type = AnswerActionTypes.AcceptAnswer;

    constructor(public puzzleId: string, public answerId: string) {}
}

export class AnswerAccepted implements Action {
    readonly type = AnswerActionTypes.AnswerAccepted;
}

export class RefuseAnswer implements Action {
    readonly type = AnswerActionTypes.RefuseAnswer;

    constructor(public puzzleId: string, public answerId: string) {}
}

export class AnswerRefused implements Action {
    readonly type = AnswerActionTypes.AnswerRefused;
}

export class ResetState implements Action {
    readonly type = AnswerActionTypes.ResetState;
}

export type AnswerActions =
    | ResetState
    | LoadData
    | AcceptAnswer
    | AnswerAccepted
    | RefuseAnswer
    | AnswerRefused
    | DataLoaded;
