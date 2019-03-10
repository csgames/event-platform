import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionsActionTypes {
    LoadCompetitions = "[Competitions] Load competitions",
    CompetitionsLoaded = "[Competitions] Competitions loaded",
    LoadCompetitionsError = "[Competitions] Competitions error",

    LoadSubscribedCompetitions = "[Subscribed Competitions] Load subscribed competitions",
    SubscribedCompetitionsLoaded = "[Subscribed Competitions] Subscribed competitions loaded",
    SubscribeCompetition = "[Subscribed Competitions] Subscribe competition"

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

    constructor(public subscribedCompetitions: string[]) { }
}

export class SubscribeCompetition implements Action {
    readonly type = CompetitionsActionTypes.SubscribeCompetition;

    constructor(public competition: Competition) {}
}

export type CompetitionsActions =
    | LoadCompetitions
    | CompetitionsLoaded
    | LoadCompetitionsError
    | LoadSubscribedCompetitions
    | SubscribedCompetitionsLoaded
    | SubscribeCompetition;
