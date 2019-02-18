import { Component, OnInit } from "@angular/core";
import {
    getPuzzleHeroError,
    getPuzzleHeroLoading,
    getPuzzleHeroNotStarredTracks,
    getPuzzleHeroStarredTracks,
    State
} from "./store/puzzle-hero.reducer";
import { select, Store } from "@ngrx/store";
import { LoadStarredTracks, LoadTracks, StarTrack } from "./store/puzzle-hero.actions";
import { Track } from "../../api/models/puzzle-hero";

@Component({
    selector: "app-puzzle-hero",
    templateUrl: "puzzle-hero.template.html",
    styleUrls: ["./puzzle-hero.style.scss"]
})
export class PuzzleHeroComponent implements OnInit {

    notStarredTracks$ = this.store$.pipe(select(getPuzzleHeroNotStarredTracks));
    starredTracks$ = this.store$.pipe(select(getPuzzleHeroStarredTracks));
    loading$ = this.store$.pipe(select(getPuzzleHeroLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroError));

    constructor(private store$: Store<State>) {
        this.store$.dispatch(new LoadTracks());
        this.store$.dispatch(new LoadStarredTracks());
    }

    ngOnInit() {
    }

    clickStar(track: Track) {
        this.store$.dispatch(new StarTrack(track));
    }
}
