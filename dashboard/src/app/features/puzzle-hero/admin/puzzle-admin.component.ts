import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { EditPuzzleHeroComponent } from "./components/edit-puzzle-hero/edit-puzzle-hero.component";
import { getPuzzleHeroAdminError, getPuzzleHeroAdminLoading, getPuzzleHeroAdminPuzzleHero, State } from "./store/puzzle-admin.reducer";
import { select, Store } from "@ngrx/store";
import { LoadPuzzleHero } from "./store/puzzle-admin.actions";
import { map, tap } from "rxjs/operators";
import { PuzzleHeroUtils } from "../utils/puzzle-hero.utils";
import { PuzzleInfo } from "../../../api/models/puzzle-hero";
import { CreateTrackComponent } from "./components/create-track/create-track.component";

@Component({
    selector: "app-puzzle-hero-admin",
    templateUrl: "./puzzle-admin.template.html",
    styleUrls: ["./puzzle-admin.style.scss"]
})
export class PuzzleAdminComponent implements OnInit {
    loading$ = this.store$.pipe(select(getPuzzleHeroAdminLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroAdminError));
    puzzleHero$ = this.store$.pipe(select(getPuzzleHeroAdminPuzzleHero));

    tracks$ = this.puzzleHero$.pipe(
        map((p) => p && PuzzleHeroUtils.formatPuzzleHeroTracksIds(p)),
        map((tracks) => {
            return tracks && tracks.map(t => {
                return {
                    ...t,
                    puzzles: t.puzzles.map(PuzzleHeroUtils.formatPuzzleNode)
                };
            });
        }),
        tap((t)=>{console.log(t);})
    );

    constructor(private store$: Store<State>, private modalService: SimpleModalService) { }

    ngOnInit() {
        this.store$.dispatch(new LoadPuzzleHero());
    }

    clickPuzzle(puzzle: PuzzleInfo) {
        this.modalService.addModal(EditPuzzleHeroComponent);
    }

    clickAddTrack() {
        this.modalService.addModal(CreateTrackComponent);
    }
}
