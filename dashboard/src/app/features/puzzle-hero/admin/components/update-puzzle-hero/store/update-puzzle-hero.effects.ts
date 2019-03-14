import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { UpdatePuzzle, UpdatePuzzleActionTypes, UpdatePuzzleError, UpdatePuzzleSuccess } from "./update-puzzle-hero.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadPuzzleHero } from "../../../store/puzzle-admin.actions";

@Injectable()
export class UpdatePuzzleEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    updatePuzzle$ = this.actions$.pipe(
        ofType<UpdatePuzzle>(UpdatePuzzleActionTypes.UpdatePuzzle),
        switchMap((action: UpdatePuzzle) => this.puzzleHeroService.updatePuzzle(action.trackId, action.id, action.puzzleFormDto)
            .pipe(
                map(() => new UpdatePuzzleSuccess()),
                catchError(() => of(new UpdatePuzzleError()))
            ))
    );


    @Effect()
    updatePuzzleSuccess$ = this.actions$.pipe(
        ofType<UpdatePuzzleSuccess>(UpdatePuzzleActionTypes.UpdatePuzzleSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.update_puzzle.success"))),
        map(() => new LoadPuzzleHero())
    );
}
