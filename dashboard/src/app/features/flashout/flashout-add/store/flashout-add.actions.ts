import { Action } from "@ngrx/store";
import { Flashout } from "src/app/api/models/flashout";
import { School } from "src/app/api/models/school";
import { AddFlashoutDto } from "../dto/add-flashout.dto";

export enum FlashoutAddActionTypes {
    LoadFlashouts = "[Flashout add] Load flashouts",
    FlashoutsLoaded = "[Flashout add] Flashouts loaded",
    AddFlashout = "[Flashout add] Add flashout",
    LoadSchools = "[Flashout add] Load schools",
    SchoolsLoaded = "[Flashout add] Schools loaded"
}

export class LoadFlashouts implements Action {
    readonly type = FlashoutAddActionTypes.LoadFlashouts;
}

export class FlashoutsLoaded implements Action {
    readonly type = FlashoutAddActionTypes.FlashoutsLoaded;

    constructor(public flashouts: Flashout[]) {}
}

export class LoadSchools implements Action {
    readonly type = FlashoutAddActionTypes.LoadSchools;
}

export class SchoolsLoaded implements Action {
    readonly type = FlashoutAddActionTypes.SchoolsLoaded;

    constructor(public schools: School[]) {}
}

export class AddFlashout implements Action {
    readonly type = FlashoutAddActionTypes.AddFlashout;
    
    constructor(public addFlashoutDto: AddFlashoutDto) {}
}

export type FlashoutAddActions =
    | LoadFlashouts
    | FlashoutsLoaded
    | AddFlashout
    | LoadSchools
    | SchoolsLoaded;
