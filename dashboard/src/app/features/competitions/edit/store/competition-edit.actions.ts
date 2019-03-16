import { Action } from "@ngrx/store";
import { Competition } from "../../../../api/models/competition";
import { Question, QuestionGraphNode } from "../../../../api/models/question";

export enum CompetitionEditActionTypes {
    LoadCompetition = "[Competition Edit] Load competition",
    CompetitionLoaded = "[Competition Edit] Competition loaded",
    LoadCompetitionError = "[Competition Edit] Load competition error",

    OpenUpdateQuestionModal = "[Competition Edit] Open update question modal",
    UpdateQuestion = "[Competition Edit] Update question",
    QuestionUpdated = "[Competition Edit] Question updated",
    UpdateQuestionError = "[Competition Edit] Update question error",

    OpenCreateQuestionModal = "[Competition Edit] Open create question modal",
    CreateQuestion = "[Competition Edit] Create question",
    QuestionCreated = "[Competition Edit] Question created",
    CreateQuestionError = "[Competition Edit] Create question error",

    OpenSettingsModal = "[Competition Edit] Open settings modal",

    SaveQuestionsAndDescription = "[Competition Edit] Save questions and description",
    SaveQuestionsAndDescriptionError = "[Competition Edit] Save questions and description error",
    QuestionsAndDescriptionSaved = "[Competition Edit] Questions and description saved",

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

export class UpdateQuestion implements Action {
    readonly type = CompetitionEditActionTypes.UpdateQuestion;

    constructor(public question: Question) {}
}

export class QuestionUpdated implements Action {
    readonly type = CompetitionEditActionTypes.QuestionUpdated;

    constructor(public question: Question) {}
}

export class UpdateQuestionError implements Action {
    readonly type = CompetitionEditActionTypes.UpdateQuestionError;
}

export class OpenCreateQuestionModal implements Action {
    readonly type = CompetitionEditActionTypes.OpenCreateQuestionModal;
}

export class CreateQuestion implements Action {
    readonly type = CompetitionEditActionTypes.CreateQuestion;

    constructor(public question: Question) {}
}

export class QuestionCreated implements Action {
    readonly type = CompetitionEditActionTypes.QuestionCreated;

    constructor(public question: QuestionGraphNode) {}
}

export class CreateQuestionError implements Action {
    readonly type = CompetitionEditActionTypes.CreateQuestionError;
}

export class SaveQuestionsAndDescription implements Action {
    readonly type = CompetitionEditActionTypes.SaveQuestionsAndDescription;

    constructor(public payload: { description: { [lang: string]: string }, questions: QuestionGraphNode[] }) {}
}

export class QuestionsAndDescriptionSaved implements Action {
    readonly type = CompetitionEditActionTypes.QuestionsAndDescriptionSaved;
}

export class SaveQuestionsAndDescriptionError implements Action {
    readonly type = CompetitionEditActionTypes.SaveQuestionsAndDescriptionError;
}

export class ResetStore implements Action {
    readonly type = CompetitionEditActionTypes.ResetStore;
}

export class OpenSettingsModal implements Action {
    readonly type = CompetitionEditActionTypes.OpenSettingsModal;

    constructor(public competition: Competition) {}
}

export type CompetitionEditActions =
    | ResetStore
    | OpenSettingsModal
    | SaveQuestionsAndDescription
    | SaveQuestionsAndDescriptionError
    | QuestionsAndDescriptionSaved
    | OpenUpdateQuestionModal
    | UpdateQuestion
    | QuestionUpdated
    | UpdateQuestionError
    | CreateQuestion
    | QuestionCreated
    | CreateQuestionError
    | OpenCreateQuestionModal
    | LoadCompetition
    | CompetitionLoaded
    | LoadCompetitionError;
