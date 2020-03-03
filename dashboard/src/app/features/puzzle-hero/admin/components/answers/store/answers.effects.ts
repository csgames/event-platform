import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { AnswerActionTypes, AnswerAccepted, FileLoaded, LoadFile, AcceptAnswer, RefuseAnswer, AnswerRefused, } from "./answers.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "../../../../../../store/app.actions";

@Injectable()
export class AnswersEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService) {}

    @Effect()
    createPuzzle$ = this.actions$.pipe(
        ofType<LoadFile>(AnswerActionTypes.LoadFile),
        switchMap((action: LoadFile) => this.puzzleHeroService.getAnswerFile(action.puzzleId, action.answerId)
            .pipe(
                map((file) => new FileLoaded(file)),
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
