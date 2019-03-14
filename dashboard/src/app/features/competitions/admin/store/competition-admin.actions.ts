import { Action } from "@ngrx/store";

export enum CompetitionsAdminActionTypes {
    LoadCompetitionsAdmin = "[Competition admin] Load competitions admin",
    CompetitionsAdminLoaded = "[Competition admin] Competitions admin loaded",
    CompetitionsAdminError = "[Competition admin] Competitions admin error"
}

export class LoadCompetitionsAdmin implements Action {
  readonly type = CompetitionsAdminActionTypes.LoadCompetitionsAdmin;
}

export type CompetitionAdminActions = LoadCompetitionsAdmin;
