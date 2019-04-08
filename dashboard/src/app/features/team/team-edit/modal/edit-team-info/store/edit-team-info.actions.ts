import { Action } from "@ngrx/store";
import { Sponsors } from "../../../../../../api/models/sponsors";
import { School } from "../../../../../../api/models/school";
import { EditTeamFormDto } from "../../../components/edit-team-form/dto/edit-team-form.dto";

export enum EditTeamInfoActionTypes {
    SchoolsLoaded = "[Edit Team Info] Schools loaded",
    SponsorsLoaded = "[Edit Team Info] Sponsors loaded",
    UpdateTeam = "[Edit Team Info] Update team",
    TeamUpdated = "[Edit Team Info] Team updates"
}

export class SchoolsLoaded implements Action {
    readonly type = EditTeamInfoActionTypes.SchoolsLoaded;

    constructor(public schools: School[]) {}
}

export class SponsorsLoaded implements Action {
    readonly type = EditTeamInfoActionTypes.SponsorsLoaded;

    constructor(public sponsors: Sponsors[]) {}
}

export class UpdateTeam implements Action {
    readonly type = EditTeamInfoActionTypes.UpdateTeam;

    constructor(public payload: { id: string, team: EditTeamFormDto }) {}
}

export class TeamUpdated implements Action {
    readonly type = EditTeamInfoActionTypes.TeamUpdated;
}

export type EditTeamInfoActions =
    | SchoolsLoaded
    | SponsorsLoaded
    | UpdateTeam
    | TeamUpdated;
