import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Attendee } from "../../../api/models/attendee";
import { EventService } from "../../../providers/event.service";
import { map, catchError, switchMap } from "rxjs/operators";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { RegisterService } from "../../../providers/register.service";
import { AddDirector, DirectorsLoaded, LoadDirectors, DirectorsActionTypes } from "./directors.actions";

@Injectable()
export class DirectorsEffects {
    constructor(private actions$: Actions,
                private eventService: EventService,
                private registerService: RegisterService) { }

    @Effect()
    loadAdmins$ = this.actions$.pipe(
        ofType<LoadDirectors>(DirectorsActionTypes.LoadDirectors),
        switchMap(() => {
            return this.eventService.getDirectors().pipe(
                map((attendees: Attendee[]) => new DirectorsLoaded(attendees)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    addAdmin$ = this.actions$.pipe(
        ofType<AddDirector>(DirectorsActionTypes.AddDirector),
        switchMap((action: AddDirector) => {
            return this.registerService.registerRole({
                role: "director",
                username: action.payload.email,
                password: action.payload.password,
                attendee: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName
                }
            }).pipe(
                map(() => new LoadDirectors()),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );
}
