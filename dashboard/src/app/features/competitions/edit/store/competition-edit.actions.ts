import { Action } from "@ngrx/store";
import { Competition, TeamResult } from "../../../../api/models/competition";
import { Question, QuestionGraphNode } from "../../../../api/models/question";
import { TeamCompetitionResult } from "../../../../api/definitions/competition";

export enum CompetitionEditActionTypes {
    LoadCompetition = "[Competition Edit] Load competition",
    CompetitionLoaded = "[Competition Edit] Competition loaded",
    LoadCompetitionError = "[Competition Edit] Load competition error",

    OpenUpdateQuestionModal = "[Competition Edit] Open update question modal",

    OpenCreateQuestionModal = "[Competition Edit] Open create question modal",

    OpenSettingsModal = "[Competition Edit] Open settings modal",

    SaveCompetition = "[Competition Edit] Save competition",
    SaveCompetitionError = "[Competition Edit] Save competition error",
    QuestionsAndDescriptionSaved = "[Competition Edit] Competition saved",

    LoadCompetitionResults = "[Competition Edit] Load competition results",
    CompetitionResultsLoaded = "[Competition Edit] Competition results loaded",
    LoadCompetitionResultsError = "[Competition Edit] Load competition results error",

    DownloadUploadedSubmissions = "[Competition Edit] Download uploaded submissions",
    UploadedSubmissionsDownloaded = "[Competition Edit] Uploaded submissions downloaded",

    ResetStore = "[Competition Edit] Reset Store"
}

export class LoadCompetition implements Action {
    readonly type = CompetitionEditActionTypes.LoadCompetition;

    constructor(public id: string) {}
}

export class CompetitionLoaded implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionLoaded;

    constructor(public competition: Competition) {}
}

export class LoadCompetitionError implements Action {
    readonly type = CompetitionEditActionTypes.LoadCompetitionError;
}

export class OpenUpdateQuestionModal implements Action {
    readonly type = CompetitionEditActionTypes.OpenUpdateQuestionModal;

    constructor(public question: Question) {}
}

export class OpenCreateQuestionModal implements Action {
    readonly type = CompetitionEditActionTypes.OpenCreateQuestionModal;
}

export class SaveCompetition implements Action {
    readonly type = CompetitionEditActionTypes.SaveCompetition;

    constructor(public payload: {
        description: { [lang: string]: string },
        questions: QuestionGraphNode[],
        results?: TeamResult[]
    }) {}
}

export class CompetitionSaved implements Action {
    readonly type = CompetitionEditActionTypes.QuestionsAndDescriptionSaved;
}

export class SaveCompetitionError implements Action {
    readonly type = CompetitionEditActionTypes.SaveCompetitionError;
}

export class ResetStore implements Action {
    readonly type = CompetitionEditActionTypes.ResetStore;
}

export class OpenSettingsModal implements Action {
    readonly type = CompetitionEditActionTypes.OpenSettingsModal;

    constructor(public competition: Competition) {}
}

export class LoadCompetitionResults implements Action {
    readonly type = CompetitionEditActionTypes.LoadCompetitionResults;

    constructor(public competitionId: string) {}
}

export class CompetitionResultsLoaded implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionResultsLoaded;

    constructor(public competitionResults: TeamCompetitionResult[]) {}
}

export class LoadCompetitionResultsError implements Action {
    readonly type = CompetitionEditActionTypes.LoadCompetitionResultsError;
}

export class DownloadUploadedSubmissions implements Action {
    readonly type = CompetitionEditActionTypes.DownloadUploadedSubmissions;

    constructor(public payload: { competitionId: string, question: QuestionGraphNode }) {}
}

export class UploadedSubmissionsDownloaded implements Action {
    readonly type = CompetitionEditActionTypes.UploadedSubmissionsDownloaded;
}

export type CompetitionEditActions =
    | DownloadUploadedSubmissions
    | UploadedSubmissionsDownloaded
    | LoadCompetitionResults
    | CompetitionResultsLoaded
    | LoadCompetitionResultsError
    | ResetStore
    | OpenSettingsModal
    | SaveCompetition
    | SaveCompetitionError
    | CompetitionSaved
    | OpenUpdateQuestionModal
    | OpenCreateQuestionModal
    | LoadCompetition
    | CompetitionLoaded
    | LoadCompetitionError;
