import { Action } from "@ngrx/store";
import { SponsorInfoDto } from "../../sponsor-form/dto/sponsor-info.dto";

export enum UpdateSponsorInfoActionTypes {
    UpdateSponsorInfo = "[Update Sponsor Info] Update sponsor info",
    UpdateSponsorInfoSuccess = "[Update Sponsor Info] Update sponsor info success",
    ResetState = "[Update Sponsor Info] Reset state"
}

export class UpdateSponsorInfo implements Action {
    readonly type = UpdateSponsorInfoActionTypes.UpdateSponsorInfo;

    constructor(public dto: SponsorInfoDto, public id: string) {}
}

export class UpdateSponsorInfoSuccess implements Action {
    readonly type = UpdateSponsorInfoActionTypes.UpdateSponsorInfoSuccess;
}

export class ResetState implements Action {
    readonly type = UpdateSponsorInfoActionTypes.ResetState;
}

export type UpdateSponsorInfoActions =
    | UpdateSponsorInfo
    | UpdateSponsorInfoSuccess
    | ResetState;
