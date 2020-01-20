import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { InfoPuzzleHeroActionTypes, ValidateAnswer, ValidateAnswerFailure, ValidateAnswerSuccess } from "./info-puzzle-hero.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadTracks } from "../../../store/tracks.actions";

@Injectable()
export class InfoPuzzleHeroEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private translateService: TranslateService, private toastrService: ToastrService) {}

    @Effect()
    validateAnswer$ = this.actions$.pipe(
        ofType<ValidateAnswer>(InfoPuzzleHeroActionTypes.ValidateAnswer),
        switchMap((action: ValidateAnswer) => this.puzzleHeroService.validatePuzzleHero(action.puzzleId, action.answer)
            .pipe(
                map(() => new ValidateAnswerSuccess()),
                catchError(() => of(new ValidateAnswerFailure()))
            )
        )
    );

    @Effect()
    validateAnswerSuccess$ = this.actions$.pipe(
        ofType<ValidateAnswerSuccess>(InfoPuzzleHeroActionTypes.ValidateAnswerSuccess),
        tap(() => this.toastrService.success(this.translateService.instant("pages.puzzle_hero.validate_success"))),
        map(() => new LoadTracks())
    );
}
