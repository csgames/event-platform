import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { CreatePuzzle, CreatePuzzleActionTypes, CreatePuzzleError, CreatePuzzleSuccess } from "./create-puzzle-hero.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadPuzzleHero } from "../../../store/puzzle-admin.actions";

@Injectable()
export class CreatePuzzleEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    createPuzzle$ = this.actions$.pipe(
        ofType<CreatePuzzle>(CreatePuzzleActionTypes.CreatePuzzle),
        switchMap((action: CreatePuzzle) => this.puzzleHeroService.createPuzzle(action.trackId, action.parentId, action.questionFormDto).pipe(
            map(() => new CreatePuzzleSuccess()),
            catchError(() => of(new CreatePuzzleError()))
        ))
    );


    @Effect()
    createPuzzleSuccess$ = this.actions$.pipe(
        ofType<CreatePuzzleSuccess>(CreatePuzzleActionTypes.CreatePuzzleSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.create_puzzle.success"))),
        map(() => new LoadPuzzleHero())
    );
}
