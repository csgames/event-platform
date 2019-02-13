import { Action } from "@ngrx/store";
import { EventGuide } from "../../../api/models/guide";

export enum GuideActionTypes {
    LoadGuide = '[Guide] Load guide',
    GuideLoaded = '[Guide] Guide loading success'
}

export class LoadGuide implements Action {
    readonly type = GuideActionTypes.LoadGuide;
}

export class GuideLoaded implements Action {
    readonly type = GuideActionTypes.GuideLoaded;
    constructor(public guide: EventGuide) {}
}

export type GuideActions =
    | LoadGuide
    | GuideLoaded;