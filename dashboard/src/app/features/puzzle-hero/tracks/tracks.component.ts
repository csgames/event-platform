import { Component, OnInit } from "@angular/core";
import {
    getPuzzleHeroError,
    getPuzzleHeroLoading,
    getPuzzleHeroNotStarredTracks,
    getPuzzleHeroStarredTracks,
    State
} from "./store/tracks.reducer";
import { select, Store } from "@ngrx/store";
import { LoadStarredTracks, LoadTracks, StarTrack } from "./store/tracks.actions";
import { Track } from "./models/track";

@Component({
    selector: "app-puzzle-hero",
    templateUrl: "tracks.template.html",
    styleUrls: ["./tracks.style.scss"]
})
export class TracksComponent implements OnInit {

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
