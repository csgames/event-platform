import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Attendee } from "../../../api/models/attendee";
import { EventService } from "../../../providers/event.service";
import { map, catchError, switchMap } from "rxjs/operators";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { RegisterService } from "../../../providers/register.service";
import { AddVolunteer, LoadVolunteers, VolunteersActionTypes, VolunteersLoaded } from "./volunteers.actions";

@Injectable()
export class VolunteersEffects {
    constructor(private actions$: Actions,
                private eventService: EventService,
                private registerService: RegisterService) { }

    @Effect()
    loadAdmins$ = this.actions$.pipe(
        ofType<LoadVolunteers>(VolunteersActionTypes.LoadVolunteers),
        switchMap(() => {
            return this.eventService.getVolunteers().pipe(
                map((attendees: Attendee[]) => new VolunteersLoaded(attendees)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    addAdmin$ = this.actions$.pipe(
        ofType<AddVolunteer>(VolunteersActionTypes.AddVolunteer),
        switchMap((action: AddVolunteer) => {
            return this.registerService.registerRole({
                role: "volunteer",
                username: action.payload.email,
                password: action.payload.password,
                attendee: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName
                }
            }).pipe(
                map(() => new LoadVolunteers()),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );
}
