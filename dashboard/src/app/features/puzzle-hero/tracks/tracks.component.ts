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
import { PuzzleInfo, Track } from "../../../api/models/puzzle-hero";
import { InfoPuzzleHeroComponent } from "./components/info-puzzle-hero/info-puzzle-hero.component";
import { SimpleModalService } from "ngx-simple-modal";

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

    openTracks: Track[] = [];

    constructor(private store$: Store<State>, private modalService: SimpleModalService) {
        this.store$.dispatch(new LoadTracks());
        this.store$.dispatch(new LoadStarredTracks());
    }

    ngOnInit() {}

    clickStar(track: Track) {
        this.store$.dispatch(new StarTrack(track));
    }

    clickPuzzle(puzzle: PuzzleInfo, track: Track) {
        if (!puzzle.locked) {
            this.modalService.addModal(InfoPuzzleHeroComponent, { puzzle, track });
        }
    }

    trackOpenChange(track: Track, open: boolean) {
        if (open) {
            this.openTracks.push(track);
        } else {
            this.openTracks = this.openTracks.filter(t => t._id !== track._id);
        }
    }

    isTrackOpen(track: Track): boolean {
        return !!this.openTracks.find(t => t._id === track._id);
    }
}
