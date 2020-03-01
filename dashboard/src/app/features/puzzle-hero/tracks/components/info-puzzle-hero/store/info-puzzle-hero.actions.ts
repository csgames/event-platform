import { Action } from "@ngrx/store";
import { QuestionAnswerDto } from "../../../../../../api/dto/competition";

export enum InfoPuzzleHeroActionTypes {
    ResetState = "[Info puzzle hero] Reset state",
    ValidateAnswer = "[Info puzzle hero] Validate answer",
    ValidateAnswerSuccess = "[Info puzzle hero] Validate answer success",
    ValidateAnswerFailure = "[Info puzzle hero] Validate answer failure",
}

export class ResetState implements Action {
    readonly type = InfoPuzzleHeroActionTypes.ResetState;
}

export class ValidateAnswer implements Action {
    readonly type = InfoPuzzleHeroActionTypes.ValidateAnswer;

    constructor(public puzzleId: string, public answer: QuestionAnswerDto) {}
}

export class ValidateAnswerSuccess implements Action {
    readonly type = InfoPuzzleHeroActionTypes.ValidateAnswerSuccess;
}

export class ValidateAnswerFailure implements Action {
    readonly type = InfoPuzzleHeroActionTypes.ValidateAnswerFailure;
}

export type InfoPuzzleHeroActions =
    | ResetState
    | ValidateAnswerSuccess
    | ValidateAnswerFailure
    | ValidateAnswer;
