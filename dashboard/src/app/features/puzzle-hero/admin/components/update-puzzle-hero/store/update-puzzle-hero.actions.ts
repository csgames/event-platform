import { Action } from "@ngrx/store";
import { PuzzleFormDto } from "../../puzzle-form/dto/puzzle-form.dto";

export enum UpdatePuzzleActionTypes {
    UpdatePuzzle = "[Update Puzzle Hero Puzzle] Update puzzle",
    UpdatePuzzleSuccess = "[Update Puzzle Hero Puzzle] Update puzzle success",
    UpdatePuzzleError = "[Update Puzzle Hero Puzzle] Update puzzle error",
    ResetState = "[Update Puzzle Hero Puzzle] Reset state"
}

export class UpdatePuzzle implements Action {
    readonly type = UpdatePuzzleActionTypes.UpdatePuzzle;

    constructor(public trackId: string, public id: string, public puzzleFormDto: PuzzleFormDto) {}
}

export class UpdatePuzzleSuccess implements Action {
    readonly type = UpdatePuzzleActionTypes.UpdatePuzzleSuccess;
}

export class UpdatePuzzleError implements Action {
    readonly type = UpdatePuzzleActionTypes.UpdatePuzzleError;
}

export class ResetState implements Action {
    readonly type = UpdatePuzzleActionTypes.ResetState;
}

export type UpdatePuzzleActions =
    | ResetState
    | UpdatePuzzleSuccess
    | UpdatePuzzleError
    | UpdatePuzzle;


