import { Action } from "@ngrx/store";
import { QuestionFormDto } from "../../../../../../components/question-form/dto/question-form.dto";

export enum AnswerActionTypes {
    LoadFile = "[Answer] Load file",
    FileLoaded = "[Answer] File loaded",
    AcceptAnswer = "[Answer] Accept answer",
    AnswerAccepted = "[Answer] Answer accepted",
    RefuseAnswer = "[Answer] Refuse answer",
    AnswerRefused = "[Answer] Answer refused",
    ResetState = "[Answer] Reset state"
}

export class LoadFile implements Action {
    readonly type = AnswerActionTypes.LoadFile;

    constructor(public puzzleId: string, public answerId: string) {}
}

export class FileLoaded implements Action {
    readonly type = AnswerActionTypes.FileLoaded;

    constructor(public file: { type: string, url: string }) {}
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
    | LoadFile
    | AcceptAnswer
    | AnswerAccepted
    | RefuseAnswer
    | AnswerRefused
    | FileLoaded;
