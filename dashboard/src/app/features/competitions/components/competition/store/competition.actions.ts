import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionActionTypes {
    LoadCompetition = "[Competition] Load competition info",
    CompetitionLoaded = "[Competition] Competition info loaded",
    LoadCompetitionError = "[Competition] Competition info error",

    UpdateQuestionAnswer = "[Question answer] Update question answer",
    QuestionAnswerUpdated = "[Question answer] Question answer updated"
}

export class LoadCompetition implements Action {
    readonly type = CompetitionActionTypes.LoadCompetition;

    constructor(public competitionId: string) {}
}

export class CompetitionLoaded implements Action {
    readonly type = CompetitionActionTypes.CompetitionLoaded;

    constructor(public competition: Competition) { }
}

export class LoadCompetitionError implements Action {
    readonly type = CompetitionActionTypes.LoadCompetitionError;
}

export class UpdateQuestionAnswer implements Action {
    readonly type = CompetitionActionTypes.UpdateQuestionAnswer;
}

export class QuestionAnswerUpdated implements Action {
    readonly type = CompetitionActionTypes.QuestionAnswerUpdated;
}
export type CompetitionActions =
    | LoadCompetition
    | CompetitionLoaded
    | LoadCompetitionError
    | UpdateQuestionAnswer
    | QuestionAnswerUpdated;
