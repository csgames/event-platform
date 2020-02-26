import { Action } from "@ngrx/store";
import { Question } from "../../../../../../api/models/question";

export enum UpdateQuestionActionTypes {
    UpdateQuestion = "[Update Question] Update question",
    QuestionUpdated = "[Update Question] Question updated",
    UpdateQuestionError = "[Update Question] Update question error",

    ResetStore = "[Update Question] Reset store"
}

export class UpdateQuestion implements Action {
    readonly type = UpdateQuestionActionTypes.UpdateQuestion;

    constructor(public payload: { competitionId: string, question: Question }) {}
}

export class QuestionUpdated implements Action {
    readonly type = UpdateQuestionActionTypes.QuestionUpdated;

    constructor(public question: Question) {}
}

export class UpdateQuestionError implements Action {
    readonly type = UpdateQuestionActionTypes.UpdateQuestionError;
}

export class ResetStore implements Action {
    readonly type = UpdateQuestionActionTypes.ResetStore;
}

export type UpdateQuestionActions =
    | UpdateQuestion
    | QuestionUpdated
    | UpdateQuestionError
    | ResetStore;
