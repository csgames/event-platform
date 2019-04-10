import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EventService } from "../../../providers/event.service";
import { CreateEvent, CreateEventError, CreateEventModalActionTypes, CreateEventSuccess } from "./create-event-modal.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { LoadEvents } from "../../../store/app.actions";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class CreateEventModalEffects {
    constructor(private actions$: Actions, private eventService: EventService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    createEvent$ = this.actions$.pipe(
        ofType<CreateEvent>(CreateEventModalActionTypes.CreateEvent),
        switchMap((action: CreateEvent) => this.eventService.createEvent(action.eventFormDto)
            .pipe(
                map(() => new CreateEventSuccess()),
                catchError(() => of(new CreateEventError()))
            )
        )
    );

    @Effect()
    createEventSuccess$ = this.actions$.pipe(
        ofType<CreateEventSuccess>(CreateEventModalActionTypes.CreateEventSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.event_form.create_event_success"))),
        map(() => new LoadEvents())
    );
}
