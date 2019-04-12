import { Action } from "@ngrx/store";
import { EventGuide } from "../../../../api/models/guide";

export enum GuideEditActionTypes {
    LoadGuideEdit = "[Guide Edit] Load guide edit",
    GuideEditLoaded = "[Guide Edit] Guide edit loading success"
}

export class LoadGuideEdit implements Action {
    readonly type = GuideEditActionTypes.LoadGuideEdit;
}

export class GuideEditLoaded implements Action {
    readonly type = GuideEditActionTypes.GuideEditLoaded;
    constructor(public guide: EventGuide) {}
}

export type GuideEditActions =
    | LoadGuideEdit
    | GuideEditLoaded;
