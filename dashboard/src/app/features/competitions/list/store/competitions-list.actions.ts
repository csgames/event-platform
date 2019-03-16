import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { InfoCompetitionModal } from "../components/info-competition/info-competition.component";

export enum CompetitionsListActionTypes {
    LoadCompetitions = "[Competitions List] Load competitions",
    CompetitionsLoaded = "[Competitions List] Competitions loaded",
    LoadCompetitionsError = "[Competitions List] Competitions error",

    LoadSubscribedCompetitions = "[Competitions List] Load subscribed competitions",
    SubscribedCompetitionsLoaded = "[Competitions List] Subscribed competitions loaded",

    SubscribeToCompetition = "[Competition Card] Subscribe to competition",
    SubscribedToCompetition = "[Competition Card] Subscribed to competition",
    CheckIfSubscribedToCompetition = "[Competition Card] Check if subscribe to competition",
    SubscriptionError = "[Competition Card] Subscription error",
    NotSubscribedToCompetition = "[Competition Card] Not subscribed to competition",
    ResetStore = "[Competition Card] Reset Store",
    ShowCompetitionInfo = "[Competition Card] Show info competition"

}

export class LoadCompetitions implements Action {
    readonly type = CompetitionsListActionTypes.LoadCompetitions;
}

export class CompetitionsLoaded implements Action {
    readonly type = CompetitionsListActionTypes.CompetitionsLoaded;

    constructor(public competitions: Competition[]) { }
}

export class LoadCompetitionsError implements Action {
    readonly type = CompetitionsListActionTypes.LoadCompetitionsError;
}

export class LoadSubscribedCompetitions implements Action {
    readonly type = CompetitionsListActionTypes.LoadSubscribedCompetitions;
}

export class SubscribedCompetitionsLoaded implements Action {
    readonly type = CompetitionsListActionTypes.SubscribedCompetitionsLoaded;

    constructor(public subscribedCompetitions: Competition[] ) { }
}

export class SubscribeToCompetition implements Action {
    readonly type = CompetitionsListActionTypes.SubscribeToCompetition;

    constructor(public competitionId: string) { }
}

export class SubscribedToCompetition implements Action {
    readonly type = CompetitionsListActionTypes.SubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class CheckIfSubscribedToCompetition implements Action {
    readonly type = CompetitionsListActionTypes.CheckIfSubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class SubscriptionError implements Action {
    readonly type = CompetitionsListActionTypes.SubscriptionError;
}

export class NotSubscribedToCompetition implements Action {
    readonly type = CompetitionsListActionTypes.NotSubscribedToCompetition;

    constructor(public activityId: string) { }
}

export class ShowCompetitionInfo implements Action {
    readonly type = CompetitionsListActionTypes.ShowCompetitionInfo;

    constructor(public payload: InfoCompetitionModal) { }
}

export class ResetStore implements Action {
    readonly type =  CompetitionsListActionTypes.ResetStore;
}

export type CompetitionsListActions =
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
