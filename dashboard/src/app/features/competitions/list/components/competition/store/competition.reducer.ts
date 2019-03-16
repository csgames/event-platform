import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionActions, CompetitionActionTypes } from "./competition.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionState {
    currentCompetition: Competition;
    loading: boolean;
    error: boolean;
    questionsValidationError: { [id: string]: boolean };
}

export interface State extends fromApp.State {
    competition: CompetitionState;
}

const initialState: CompetitionState = {
    currentCompetition: null,
    loading: false,
    error: false,
    questionsValidationError: {}
};

export function reducer(state = initialState, action: CompetitionActions): CompetitionState {
    switch (action.type) {
        case CompetitionActionTypes.LoadCompetition:
            return {
                ...state,
                loading: true,
                currentCompetition: null,
                error: false
            };

        case CompetitionActionTypes.CompetitionLoaded:
            return {
                ...state,
                loading: false,
                currentCompetition: action.competition
            };

        case CompetitionActionTypes.LoadCompetitionError:
            return {
                ...state,
                loading: false,
                error: true
            };

        case CompetitionActionTypes.UpdateQuestionAnswer:
            return {
                ...state,
                loading: true,
                questionsValidationError: {
                    ...state.questionsValidationError,
                    [action.questionId]: false
                }
            };

        case CompetitionActionTypes.QuestionAnswerUpdated:
            return {
                ...state,
                loading: false
            };

        case CompetitionActionTypes.UpdateQuestionAnswerError:
            return {
                ...state,
                loading: false,
                questionsValidationError: {
                    ...state.questionsValidationError,
                    [action.questionId]: true
                }
            };
    }

    return state;
}

export const getCompetitionState = createFeatureSelector<State, CompetitionState>("competition");
export const getCompetition = createSelector(getCompetitionState, (state: CompetitionState) => state.currentCompetition);

export const getCompetitionLoading = createSelector(getCompetitionState, (state: CompetitionState) => state.loading);
export const getCompetitionError = createSelector(getCompetitionState, (state: CompetitionState) => state.error);
export const getCompetitionQuestionsValidationError = createSelector(
    getCompetitionState,
    (state: CompetitionState) => state.questionsValidationError
);
