import { Action } from "@ngrx/store";
import { InfoCompetitionModal } from "../../info-competition/info-competition.component";

export enum CompetitionCardActionTypes {
    SubscribeToCompetition = "[CompetitionCard] Subscribe to competition",
    SubscribedToCompetition = "[CompetitionCard] Subscribed to competition",
    CheckIfSubscribedToCompetition = "[CompetitionCard] Check if subscribe to competition",
    SubscriptionError = "[CompetitionCard] Subscription error",
    NotSubscribedToCompetition = "[CompetitionCard] Not subscribed to competition",
    ResetStore = "[CompetitionCard] Reset Store",
    ShowCompetitionInfo = "[CompetitionCard] Show info competition"
}

export class SubscribeToCompetition implements Action {
    readonly type = CompetitionCardActionTypes.SubscribeToCompetition;

    constructor(public competitionId: string) { }
}

export class SubscribedToCompetition implements Action {
    readonly type = CompetitionCardActionTypes.SubscribedToCompetition;
}

export class CheckIfSubscribedToCompetition implements Action {
    readonly type = CompetitionCardActionTypes.CheckIfSubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class SubscriptionError implements Action {
    readonly type = CompetitionCardActionTypes.SubscriptionError;
}

export class NotSubscribedToCompetition implements Action {
    readonly type = CompetitionCardActionTypes.NotSubscribedToCompetition;
}

export class ShowCompetitionInfo implements Action {
    readonly type = CompetitionCardActionTypes.ShowCompetitionInfo;

    constructor(public payload: InfoCompetitionModal) { }
}

export class ResetStore implements Action {
    readonly type =  CompetitionCardActionTypes.ResetStore;
}

export type CompetitionCardActions =
    | SubscribeToCompetition
    | SubscribedToCompetition
    | CheckIfSubscribedToCompetition
    | SubscriptionError
    | NotSubscribedToCompetition
    | ShowCompetitionInfo
    | ResetStore;
