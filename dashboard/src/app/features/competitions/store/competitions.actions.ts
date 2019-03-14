import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { InfoCompetitionModal } from "../components/info-competition/info-competition.component";

export enum CompetitionsActionTypes {
    LoadCompetitions = "[Competitions] Load competitions",
    CompetitionsLoaded = "[Competitions] Competitions loaded",
    LoadCompetitionsError = "[Competitions] Competitions error",

    LoadSubscribedCompetitions = "[Subscribed Competitions] Load subscribed competitions",
    SubscribedCompetitionsLoaded = "[Subscribed Competitions] Subscribed competitions loaded",
    SubscribeCompetition = "[Subscribed Competitions] Subscribe competition",

    SubscribeToCompetition = "[CompetitionCard] Subscribe to competition",
    SubscribedToCompetition = "[CompetitionCard] Subscribed to competition",
    CheckIfSubscribedToCompetition = "[CompetitionCard] Check if subscribe to competition",
    SubscriptionError = "[CompetitionCard] Subscription error",
    NotSubscribedToCompetition = "[CompetitionCard] Not subscribed to competition",
    ResetStore = "[CompetitionCard] Reset Store",
    ShowCompetitionInfo = "[CompetitionCard] Show info competition"

}

export class LoadCompetitions implements Action {
    readonly type = CompetitionsActionTypes.LoadCompetitions;
}

export class CompetitionsLoaded implements Action {
    readonly type = CompetitionsActionTypes.CompetitionsLoaded;

    constructor(public competitions: Competition[]) { }
}

export class LoadCompetitionsError implements Action {
    readonly type = CompetitionsActionTypes.LoadCompetitionsError;
}

export class LoadSubscribedCompetitions implements Action {
    readonly type = CompetitionsActionTypes.LoadSubscribedCompetitions;
}

export class SubscribedCompetitionsLoaded implements Action {
    readonly type = CompetitionsActionTypes.SubscribedCompetitionsLoaded;

    constructor(public subscribedCompetitions: Competition[] ) { }
}

export class SubscribeToCompetition implements Action {
    readonly type = CompetitionsActionTypes.SubscribeToCompetition;

    constructor(public competitionId: string) { }
}

export class SubscribedToCompetition implements Action {
    readonly type = CompetitionsActionTypes.SubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class CheckIfSubscribedToCompetition implements Action {
    readonly type = CompetitionsActionTypes.CheckIfSubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class SubscriptionError implements Action {
    readonly type = CompetitionsActionTypes.SubscriptionError;
}

export class NotSubscribedToCompetition implements Action {
    readonly type = CompetitionsActionTypes.NotSubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class ShowCompetitionInfo implements Action {
    readonly type = CompetitionsActionTypes.ShowCompetitionInfo;

    constructor(public payload: InfoCompetitionModal) { }
}

export class ResetStore implements Action {
    readonly type =  CompetitionsActionTypes.ResetStore;
}

export type CompetitionsActions =
    | LoadCompetitions
    | CompetitionsLoaded
    | LoadCompetitionsError
    | LoadSubscribedCompetitions
    | SubscribedCompetitionsLoaded
    | SubscribeToCompetition
    | SubscribedToCompetition
    | CheckIfSubscribedToCompetition
    | SubscriptionError
    | NotSubscribedToCompetition
    | ShowCompetitionInfo
    | ResetStore;
