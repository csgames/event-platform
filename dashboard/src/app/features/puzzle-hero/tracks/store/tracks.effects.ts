import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";
import {
    LoadStarredTracks,
    LoadTracksError,
    LoadTracks,
    TracksActionTypes,
    StarredTracksLoaded,
    TracksLoaded, StarTrack
} from "./tracks.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class TracksEffects {
    constructor(private actions$: Actions,
                private puzzleHeroService: PuzzleHeroService) {}

    @Effect()
    loadTracks$ = this.actions$.pipe(
        ofType<LoadTracks>(TracksActionTypes.LoadTracks),
        switchMap(() => this.puzzleHeroService.getTracks()
            .pipe(
                map((t) => new TracksLoaded(t)),
                catchError(() => of(new LoadTracksError()))
            )
        )
    );

    @Effect()
    loadStarredTracks$ = this.actions$.pipe(
        ofType<LoadStarredTracks>(TracksActionTypes.LoadStarredTracks),
        map(() => new StarredTracksLoaded(this.puzzleHeroService.getStarredTracks()))
    );

    @Effect()
    starTrack$ = this.actions$.pipe(
        ofType<StarTrack>(TracksActionTypes.StarTrack),
        tap((action: StarTrack) => this.puzzleHeroService.toggleTrackStarred(action.track)),
        map(() => new LoadStarredTracks())
    );
}
