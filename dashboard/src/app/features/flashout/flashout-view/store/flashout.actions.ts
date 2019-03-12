import { Action } from "@ngrx/store";
import { Flashout, AttendeeVote } from "src/app/api/models/flashout";

export enum FlashoutActionTypes {
    LoadFlashouts = "[Flashout] Load flashouts",
    FlashoutsLoaded = "[Flashout] Flashouts loaded",
    VoteFlashouts = "[Flashout] Vote Flashouts",
    FlashoutsVoted = "[Flashout] Flashouts voted"
}

export class LoadFlashouts implements Action {
    readonly type = FlashoutActionTypes.LoadFlashouts;
}

export class FlashoutsLoaded implements Action {
    readonly type = FlashoutActionTypes.FlashoutsLoaded;

    constructor(public flashouts: Flashout[]) { }
}

export class VoteFlashouts implements Action {
    readonly type = FlashoutActionTypes.VoteFlashouts;

    constructor(public votes: { votes: AttendeeVote[] }) { }
}

export class FlashoutsVoted implements Action {
    readonly type = FlashoutActionTypes.FlashoutsVoted;
}

export type FlashoutActions =
    | LoadFlashouts
    | FlashoutsLoaded
    | VoteFlashouts
    | FlashoutsVoted;
