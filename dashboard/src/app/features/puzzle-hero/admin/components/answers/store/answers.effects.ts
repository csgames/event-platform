import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { AnswerActionTypes, AnswerAccepted, DataLoaded, LoadData, AcceptAnswer, RefuseAnswer, AnswerRefused, } from "./answers.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "../../../../../../store/app.actions";

@Injectable()
export class AnswersEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService) {}

    @Effect()
    LoadData$ = this.actions$.pipe(
        ofType<LoadData>(AnswerActionTypes.LoadData),
        switchMap((action: LoadData) => this.puzzleHeroService.getAnswerFile(action.puzzleId, action.answerId)
            .pipe(
                map((data) => new DataLoaded(data)),
                catchError((e) => of(new GlobalError(e))
            )
        ))
    );

    @Effect()
    acceptAnswer$ = this.actions$.pipe(
        ofType<AcceptAnswer>(AnswerActionTypes.AcceptAnswer),
        switchMap((action: AcceptAnswer) => this.puzzleHeroService.manuallyAcceptAnswer(action.puzzleId, action.answerId)
            .pipe(
                map(() => new AnswerAccepted()),
                catchError((e) => of(new GlobalError(e))
            )
        ))
    );

    @Effect()
    refuseAnswer$ = this.actions$.pipe(
        ofType<RefuseAnswer>(AnswerActionTypes.RefuseAnswer),
        switchMap((action: RefuseAnswer) => this.puzzleHeroService.manuallyRefuseAnswer(action.puzzleId, action.answerId)
            .pipe(
                map(() => new AnswerRefused()),
                catchError((e) => of(new GlobalError(e))
            )
        ))
    );
}
