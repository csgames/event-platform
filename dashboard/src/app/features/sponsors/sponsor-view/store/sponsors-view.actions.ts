import { Action } from "@ngrx/store";
import { Sponsors } from "src/app/api/models/sponsors";

export enum SponsorsViewActionTypes {
    LoadSponsors = "[Sponsors] Load sponsors",
    SponsorsLoaded = "[Sponsors] Sponsors loaded"
}

export class LoadSponsors implements Action {
    readonly type = SponsorsViewActionTypes.LoadSponsors;
}

export class SponsorsLoaded implements Action {
    readonly type = SponsorsViewActionTypes.SponsorsLoaded;

    constructor(public sponsors: { [id: string]: Sponsors[] }) {}
}

export type SponsorsViewActions =
    | LoadSponsors
    | SponsorsLoaded;
