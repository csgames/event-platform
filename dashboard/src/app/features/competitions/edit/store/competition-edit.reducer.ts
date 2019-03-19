import { Competition } from "../../../../api/models/competition";
import * as fromApp from "../../../../store/app.reducers";
import { CompetitionEditActions, CompetitionEditActionTypes } from "./competition-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Question, QuestionGraphNode } from "../../../../api/models/question";
import { TeamCompetitionResult } from "../../../../api/definitions/competition";

export interface CompetitionEditState {
    loading: boolean;
    error: boolean;
    competition: Competition;
    competitionResults: TeamCompetitionResult[];
}

export const initialState: CompetitionEditState = {
    loading: false,
    error: false,
    competition: null,
    competitionResults: []
};

export interface State extends fromApp.State {
    competitionEdit: CompetitionEditState;
}

export function reducer(state = initialState, action: CompetitionEditActions): CompetitionEditState {
    switch (action.type) {
        case CompetitionEditActionTypes.LoadCompetition:
            return {
                ...state,
                loading: true,
                error: false
            };

        case CompetitionEditActionTypes.CompetitionLoaded:
            return {
                ...state,
                loading: false,
                competition: action.competition
            };

        case CompetitionEditActionTypes.LoadCompetitionError:
            return {
                ...state,
                loading: false,
                error: true,
                competition: null
            };

        case CompetitionEditActionTypes.UpdateQuestion:
            return {
                ...state,
                loading: true
            };

        case CompetitionEditActionTypes.QuestionUpdated:
            const oldQuestionNode = (state.competition.questions as QuestionGraphNode[])
                .find(q => (q.question as Question)._id === action.question._id);
            const competitionIndex = (state.competition.questions as QuestionGraphNode[]).indexOf(oldQuestionNode);
            return {
                ...state,
                loading: false,
                competition: {
                    ...state.competition,
                    questions: ([
                        ...state.competition.questions.slice(0, competitionIndex),
                        {
                            ...oldQuestionNode,
                            question: action.question
                        },
                        ...state.competition.questions.slice(competitionIndex + 1)
                    ] as QuestionGraphNode[])
                }
            };

        case CompetitionEditActionTypes.CreateQuestion:
            return {
                ...state,
                loading: true
            };

        case CompetitionEditActionTypes.QuestionCreated:
            return {
                ...state,
                loading: false,
                competition: {
                    ...state.competition,
                    questions: ([
                        ...state.competition.questions,
                        action.question
                    ] as QuestionGraphNode[])
                }
            };

        case CompetitionEditActionTypes.SaveCompetition:
            return {
                ...state,
                loading: true
            };

        case CompetitionEditActionTypes.LoadCompetitionResults:
            return {
                ...state,
                loading: true,
                competitionResults: []
            };

        case CompetitionEditActionTypes.CompetitionResultsLoaded:
            return {
                ...state,
                loading: false,
                competitionResults: action.competitionResults
            };

        case CompetitionEditActionTypes.UpdateQuestionError:
        case CompetitionEditActionTypes.CreateQuestionError:
        case CompetitionEditActionTypes.QuestionsAndDescriptionSaved:
        case CompetitionEditActionTypes.LoadCompetitionResultsError:
        case CompetitionEditActionTypes.SaveCompetitionError:
        case CompetitionEditActionTypes.UploadedSubmissionsDownloaded:
            return {
                ...state,
                loading: false
            };

        case CompetitionEditActionTypes.DownloadUploadedSubmissions:
            return {
                ...state,
                loading: true
            };

        case CompetitionEditActionTypes.ResetStore:
            return initialState;
    }

    return state;
}

export const getCompetitionEditState = createFeatureSelector<State, CompetitionEditState>("competitionEdit");

export const getCompetitionEditCompetition = createSelector(
    getCompetitionEditState,
    (state: CompetitionEditState) => state.competition
);

export const getCompetitionEditLoading = createSelector(
    getCompetitionEditState,
    (state: CompetitionEditState) => state.loading
);

export const getCompetitionEditError = createSelector(
    getCompetitionEditState,
    (state: CompetitionEditState) => state.error
);

export const getCompetitionEditCompetitionResults = createSelector(
    getCompetitionEditState,
    (state: CompetitionEditState) => state.competitionResults
);
