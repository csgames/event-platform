import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { QuestionAnswerDto } from "../../../../../api/dto/competition";

export enum CompetitionActionTypes {
    LoadCompetition = "[Competition] Load competition info",
    CompetitionLoaded = "[Competition] Competition info loaded",
    LoadCompetitionError = "[Competition] Competition info error",

    UpdateQuestionAnswer = "[Question answer] Update question answer",
    QuestionAnswerUpdated = "[Question answer] Question answer updated",
    UpdateQuestionAnswerError = "[Question answer] Update question answer error"
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

    constructor(public competitionId: string,
                public questionId: string,
                public questionAnswerDto: QuestionAnswerDto) {}
}

export class QuestionAnswerUpdated implements Action {
    readonly type = CompetitionActionTypes.QuestionAnswerUpdated;
}

export class UpdateQuestionAnswerError implements Action {
    readonly type = CompetitionActionTypes.UpdateQuestionAnswerError;

    constructor(public questionId: string) {}
}

export type CompetitionActions =
    | LoadCompetition
    | CompetitionLoaded
    | LoadCompetitionError
    | UpdateQuestionAnswer
    | UpdateQuestionAnswerError
    | QuestionAnswerUpdated;
