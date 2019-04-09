import { Action } from "@ngrx/store";
import { Sponsors } from "src/app/api/models/sponsors";
import { SponsorInfoDto } from "../../components/sponsor-form/dto/sponsor-info.dto";

export enum SponsorEditActionTypes {
    LoadSponsors = "[Sponsor edit] Load sponsors",
    SponsorsLoaded = "[Sponsor edit] Sponsors loaded",
    AddSponsor = "[Sponsor edit] Add sponsor"
}

export class LoadSponsors implements Action {
    readonly type = SponsorEditActionTypes.LoadSponsors;
}

export class SponsorsLoaded implements Action {
    readonly type = SponsorEditActionTypes.SponsorsLoaded;

    constructor(public sponsors: { [id: string]: Sponsors[] }) {}
}

export class AddSponsor implements Action {
    readonly type = SponsorEditActionTypes.AddSponsor;

    constructor(public dto: SponsorInfoDto, public tier: string) {}
}

export type SponsorEditActions =
    | LoadSponsors
    | SponsorsLoaded
    | AddSponsor;
