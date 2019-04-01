import { Action } from "@ngrx/store";
import { PuzzleHero } from "../../../../api/models/puzzle-hero";

export enum PuzzleAdminActionTypes {
    LoadPuzzleHero = "[Puzzle Admin] Load puzzle hero",
    PuzzleHeroLoaded = "[Puzzle Admin] Puzzle hero loaded",
    LoadPuzzleHeroError = "[Puzzle Admin] Load puzzle hero error"
}

export class LoadPuzzleHero implements Action {
    readonly type = PuzzleAdminActionTypes.LoadPuzzleHero;
}

export class PuzzleHeroLoaded implements Action {
    readonly type = PuzzleAdminActionTypes.PuzzleHeroLoaded;

    constructor(public puzzleHero: PuzzleHero) {}
}

export class LoadPuzzleHeroError implements Action {
    readonly type = PuzzleAdminActionTypes.LoadPuzzleHeroError;
}

export type PuzzleAdminActions =
    | LoadPuzzleHero
    | PuzzleHeroLoaded
    | LoadPuzzleHeroError;
