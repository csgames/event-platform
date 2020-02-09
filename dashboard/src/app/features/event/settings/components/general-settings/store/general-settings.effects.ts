import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EventService } from "../../../../../../providers/event.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { of } from "rxjs";
import { LoadEvents } from "../../../../../../store/app.actions";
import { EditEvent, EditEventError, EventGeneralSettingsActionTypes, EditEventSuccess } from "./general-settings.actions";

@Injectable()
export class GeneralSettingsEffects {
    constructor(private actions$: Actions, private eventService: EventService, private toastrService: ToastrService,
                private translateService: TranslateService) {}


    @Effect()
    editEvent$ = this.actions$.pipe(
        ofType<EditEvent>(EventGeneralSettingsActionTypes.EditEvent),
        switchMap((action: EditEvent) => this.eventService.editEvent(action.eventFormDto)
            .pipe(
                take(1),
                map(() => new EditEventSuccess()),
                catchError(() => of(new EditEventError()))
            )
        )
    );

    @Effect()
    editEventSuccess$ = this.actions$.pipe(
        ofType<EditEventSuccess>(EventGeneralSettingsActionTypes.EditEventSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.event_form.edit_event_success"))),
        map(() => new LoadEvents())
    );

    @Effect({ dispatch: false })
    editEventError$ = this.actions$.pipe(
        ofType<EditEventError>(EventGeneralSettingsActionTypes.EditEventError),
        tap(() => this.toastrService.error("", this.translateService.instant("components.event_form.edit_event_error")))
    );
}
