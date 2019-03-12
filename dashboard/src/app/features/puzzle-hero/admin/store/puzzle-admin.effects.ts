import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";
import { LoadPuzzleHero, LoadPuzzleHeroError, PuzzleAdminActionTypes, PuzzleHeroLoaded } from "./puzzle-admin.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class PuzzleAdminEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService) {}

    @Effect()
    loadPuzzleHero$ = this.actions$.pipe(
        ofType<LoadPuzzleHero>(PuzzleAdminActionTypes.LoadPuzzleHero),
        switchMap(() => this.puzzleHeroService.getPuzzleHero().pipe(
            map(p => new PuzzleHeroLoaded(p)),
            catchError(() => of(new LoadPuzzleHeroError()))
        ))
    );
}
