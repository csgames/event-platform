import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { FlashoutService } from "src/app/providers/flashout.service";
import { LoadFlashouts, FlashoutActionTypes, FlashoutsLoaded, VoteFlashouts, FlashoutsVoted } from "./flashout.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class FlashoutEffects {
    constructor(private actions$: Actions,
                private flashoutService: FlashoutService,
                private toastr: ToastrService,
                private translateService: TranslateService) { }

    @Effect()
    loadFlashouts$ = this.actions$.pipe(
        ofType<LoadFlashouts>(FlashoutActionTypes.LoadFlashouts),
        switchMap(() => this.flashoutService.getAllFlashouts().pipe(
                map(flashouts => new FlashoutsLoaded(flashouts)),
                catchError(err => of(new GlobalError(err)))
            )
        )
    );

    @Effect()
    voteFlashouts$ = this.actions$.pipe(
        ofType<VoteFlashouts>(FlashoutActionTypes.VoteFlashouts),
        switchMap((action: VoteFlashouts) => this.flashoutService.voteFlashouts(action.votes).pipe(
                map(() => new FlashoutsVoted()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );

    @Effect()
    flashoutsVoted = this.actions$.pipe(
        ofType<FlashoutsVoted>(FlashoutActionTypes.FlashoutsVoted),
        tap(() => this.toastr.success(this.translateService.instant("pages.flashouts.vote_success"))),
        map(() => new LoadFlashouts())
    );
}
