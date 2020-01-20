import { Action } from "@ngrx/store";
import { SponsorPositionningDto } from "../../sponsor-positionning-form/dto/sponsor-positionning.dto";

export enum UpdateSponsorPositionningActionTypes {
    UpdatePositionning = "[Update Sponsor Positionning] Update sponsor positionning",
    UpdatePositionningSuccess = "[Update Sponsor Positionning] Update sponsor positionning success",
    ResetState = "[Update Sponsor Positionning] Reset state"
}

export class UpdatePositionning implements Action {
    readonly type = UpdateSponsorPositionningActionTypes.UpdatePositionning;

    constructor(
        public dto: SponsorPositionningDto,
        public id: string,
        public tier: string
    ) {}
}

export class UpdatePositionningSuccess implements Action {
    readonly type = UpdateSponsorPositionningActionTypes.UpdatePositionningSuccess;
}

export class ResetState implements Action {
    readonly type = UpdateSponsorPositionningActionTypes.ResetState;
}

export type UpdateSponsorPositionningActions =
    | UpdatePositionning
    | UpdatePositionningSuccess
    | ResetState;
