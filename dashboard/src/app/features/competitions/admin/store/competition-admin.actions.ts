import { Action } from "@ngrx/store";
import { Activity } from "../../../../api/models/activity";
import { Competition } from "src/app/api/models/competition";
import { CompetitionFormDto } from "../components/competition-form/dto/competition-form.dto";
import { Attendee } from "../../../../api/models/attendee";
import { EventScore } from "../../../../api/models/event";

export enum CompetitionsAdminActionTypes {
    LoadCompetitionsAdmin = "[Competition admin] Load competitions admin",
    CompetitionsAdminLoaded = "[Competition admin] Competitions admin loaded",
    CompetitionsAdminError = "[Competition admin] Competitions admin error",
    LoadActivities = "[Competition admin] Load activities",
    ActivitiesLoaded = "[Competition admin] Activities loaded",
    LoadDirectors = "[Competition admin] Load directors",
    DirectorsLoaded = "[Competition admin] Directors loaded",
    CreateCompetition = "[Competition admin] Create competition",
    CreateCompetitionSuccess = "[Competition admin] Create competition success",
    EditCompetition = "[Competition admin] Edit competition",
    LoadEventScore = "[Competition admin] Load event score",
    EventScoreLoaded = "[Competition admin] Event score loaded",
    LoadEventScoreError = "[Competition admin] Load event score error"
}

export class LoadCompetitionsAdmin implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadCompetitionsAdmin;
}

export class CompetitionsAdminLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.CompetitionsAdminLoaded;

    constructor(public competitions: Competition[]) {
    }
}

export class CompetitionsAdminError implements Action {
    readonly type = CompetitionsAdminActionTypes.CompetitionsAdminError;
}

export class LoadActivities implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.ActivitiesLoaded;

    constructor(public payload: Activity[]) {
    }
}

export class LoadDirectors implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadDirectors;
}

export class DirectorsLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.DirectorsLoaded;

    constructor(public payload: Attendee[]) {
    }
}

export class CreateCompetition implements Action {
    readonly type = CompetitionsAdminActionTypes.CreateCompetition;

    constructor(public payload: CompetitionFormDto) {
    }
}

export class CreateCompetitionSuccess implements Action {
    readonly type = CompetitionsAdminActionTypes.CreateCompetitionSuccess;
}

export class EditCompetition implements Action {
    readonly type = CompetitionsAdminActionTypes.EditCompetition;

    constructor(public payload: Competition) {}
}

export class LoadEventScore implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadEventScore;
}

export class EventScoreLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.EventScoreLoaded;

    constructor(public eventScore: EventScore) {}
}

export class LoadEventScoreError implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadEventScoreError;
}

export type CompetitionAdminActions =
    | LoadCompetitionsAdmin
    | CompetitionsAdminLoaded
    | CompetitionsAdminError
    | LoadActivities
    | ActivitiesLoaded
    | LoadDirectors
    | DirectorsLoaded
    | CreateCompetition
    | CreateCompetitionSuccess
    | EditCompetition
    | LoadEventScore
    | EventScoreLoaded
    | LoadEventScoreError;
