import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "./onboarding.reducer";
import { UpdateAttendee, OnboardingActionTypes, UpdateSuccess, UpdateFailure } from "./onboarding.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { AttendeeService } from "src/app/providers/attendee.service";
import { of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class OnboardingEffects {
    constructor(private actions$: Actions,
                private store$: Store<State>,
                private attendeeService: AttendeeService,
                private translateService: TranslateService,
                private toastr: ToastrService) { }

    @Effect()
    update$ = this.actions$.pipe(
        ofType<UpdateAttendee>(OnboardingActionTypes.UpdateAttendee),
        switchMap((action: UpdateAttendee) => 
            this.attendeeService.updateAttendee(action.payload).pipe(
                map(() => new UpdateSuccess()),
                catchError(() => of(new UpdateFailure()))
            )
        )
    );

    @Effect({ dispatch: false })
    updateFail$ = this.actions$.pipe(
        ofType<UpdateFailure>(OnboardingActionTypes.UpdateFailure),
        tap(() => {
            const text = this.translateService.instant("components.toast.attendee_failed");
            this.toastr.error(text);
        })
    );

    @Effect({ dispatch: false })
    updateSuccess$ = this.actions$.pipe(
        ofType<UpdateSuccess>(OnboardingActionTypes.UpdateSuccess),
        tap(() => {
            const text = this.translateService.instant("components.toast.attendee_success");
            this.toastr.success(text);
        })
    );
}
