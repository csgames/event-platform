import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "../../../../../providers/competitions.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ValidatePassword, 
         InfoCompetitionActionTypes,
         ValidatePasswordSuccess,
         ValidatePasswordFailure } from "./info-competition.actions";
import { LoadCompetitions } from "../../../store/competitions.actions";
import { Router } from "@angular/router";

@Injectable()
export class InfoCompetitionEffects {
    constructor(private actions$: Actions, private competitionService: CompetitionsService,
                private translateService: TranslateService, private toastrService: ToastrService,
                private router: Router) {}

    @Effect()
    validatePassword$ = this.actions$.pipe(
        ofType<ValidatePassword>(InfoCompetitionActionTypes.ValidatePassword),
        switchMap((action: ValidatePassword) => this.competitionService.validatePassword(action.competitionId,
            {
                password: action.password
            })
            .pipe(
                map(() => new ValidatePasswordSuccess(action.competitionId)),
                catchError(() => of(new ValidatePasswordFailure()))
            )
        )
    );

    @Effect()
    validatePasswordSuccess$ = this.actions$.pipe(
        ofType<ValidatePasswordSuccess>(InfoCompetitionActionTypes.ValidatePasswordSuccess),
        tap((action: ValidatePasswordSuccess) => {
            this.toastrService.success(this.translateService.instant("pages.competition.validate_success"));
            this.router.navigate([`/competition/${action.competitionId}`]);
        }),
        map(() => new LoadCompetitions())
    );
}
