import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionsAdminActionTypes {
    LoadCompetitionsAdmin = "[Competition admin] Load competitions admin",
    CompetitionsAdminLoaded = "[Competition admin] Competitions admin loaded",
    CompetitionsAdminError = "[Competition admin] Competitions admin error"
}

export class LoadCompetitionsAdmin implements Action {
  readonly type = CompetitionsAdminActionTypes.LoadCompetitionsAdmin;
}

export class CompetitionsAdminLoaded implements Action {
  readonly type = CompetitionsAdminActionTypes.CompetitionsAdminLoaded;

  constructor(public competitions: Competition[]) {}
}

export class CompetitionsAdminError implements Action {
  readonly type = CompetitionsAdminActionTypes.CompetitionsAdminError;
}

export type CompetitionAdminActions = 
  | LoadCompetitionsAdmin
  | CompetitionsAdminLoaded
  | CompetitionsAdminError;
