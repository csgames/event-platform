import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { InfoCompetitionModal } from "../info-competition/info-competition.component";

export enum CompetitionsActionTypes {
    LoadCompetitions = "[Competitions] Load competitions",
    CompetitionsLoaded = "[Competitions] Competitions loaded",
    LoadCompetitionsError = "[Competitions] Competitions error",
    ShowCompetitionInfo = "[Competition] Show competition info",

    LoadSubscribedCompetitions = "[Subscribed Competitions] Load subscribed competitions",
    SubscribedCompetitionsLoaded = "[Subscribed Competitions] Subscribed competitions loaded",
    SubscribeCompetition = "[Subscribed Competitions] Subscribe Competition"

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
}

export class ShowCompetitionInfo implements Action {
    readonly type = CompetitionsActionTypes.ShowCompetitionInfo;

    constructor(public payload: InfoCompetitionModal) { }
}

export type CompetitionsActions =
    | LoadCompetitions
    | CompetitionsLoaded
    | LoadCompetitionsError
    | LoadSubscribedCompetitions
    | SubscribedCompetitionsLoaded
    | SubscribeCompetition
    | ShowCompetitionInfo;
