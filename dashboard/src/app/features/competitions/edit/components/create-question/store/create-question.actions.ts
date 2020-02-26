import { Action } from "@ngrx/store";
import { Question, QuestionGraphNode } from "../../../../../../api/models/question";

export enum CreateQuestionActionTypes {
    CreateQuestion = "[Create Question] Create question",
    QuestionCreated = "[Create Question] Question created",
    CreateQuestionError = "[Create Question] Create question error",

    ResetStore = "[Create Question] Reset store"
}

export class CreateQuestion implements Action {
    readonly type = CreateQuestionActionTypes.CreateQuestion;

    constructor(public payload: { competitionId: string, question: Question }) {}
}

export class QuestionCreated implements Action {
    readonly type = CreateQuestionActionTypes.QuestionCreated;

    constructor(public question: QuestionGraphNode) {}
}

export class CreateQuestionError implements Action {
    readonly type = CreateQuestionActionTypes.CreateQuestionError;
}

export class ResetStore implements Action {
    readonly type = CreateQuestionActionTypes.ResetStore;
}

export type CreateQuestionActions =
    | CreateQuestion
    | QuestionCreated
    | CreateQuestionError
    | ResetStore;
