import { Action } from "@ngrx/store";
import { Flashout } from "src/app/api/models/flashout";
import { School } from "src/app/api/models/school";
import { FlashoutEditDto } from "../components/flashout-form/dto/flashout-edit.dto";

export enum FlashoutEditActionTypes {
    LoadFlashouts = "[FlashoutEdit] Load flashouts",
    FlashoutsLoaded = "[FlashoutEdit] Flashouts loaded",
    AddFlashout = "[FlashoutEdit] Add flashout",
    LoadSchools = "[FlashoutEdit] Load schools",
    SchoolsLoaded = "[FlashoutEdit] Schools loaded"
}

export class LoadFlashouts implements Action {
    readonly type = FlashoutEditActionTypes.LoadFlashouts;
}

export class FlashoutsLoaded implements Action {
    readonly type = FlashoutEditActionTypes.FlashoutsLoaded;

    constructor(public flashouts: Flashout[]) {}
}

export class LoadSchools implements Action {
    readonly type = FlashoutEditActionTypes.LoadSchools;
}

export class SchoolsLoaded implements Action {
    readonly type = FlashoutEditActionTypes.SchoolsLoaded;

    constructor(public schools: School[]) {}
}

export class AddFlashout implements Action {
    readonly type = FlashoutEditActionTypes.AddFlashout;
    
    constructor(public addFlashoutDto: FlashoutEditDto) {}
}

export type FlashoutEditActions =
    | LoadFlashouts
    | FlashoutsLoaded
    | AddFlashout
    | LoadSchools
    | SchoolsLoaded;
