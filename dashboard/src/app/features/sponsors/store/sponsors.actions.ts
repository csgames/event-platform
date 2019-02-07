import { Action } from "@ngrx/store";
import { Sponsors } from "src/app/api/models/sponsors";

export enum SponsorsActionTypes {
    LoadSponsors = "[Sponsors] Load sponsors",
    SponsorsLoaded = "[Sponsors] Sponsors loaded"
}

export class LoadSponsors implements Action {
    readonly type = SponsorsActionTypes.LoadSponsors;
}

export class SponsorsLoaded implements Action {
    readonly type = SponsorsActionTypes.SponsorsLoaded;

    constructor(public sponsors: { [id: string]: Sponsors[] }) {}
}

export type SponsorsActions =
    | LoadSponsors
    | SponsorsLoaded;