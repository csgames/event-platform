import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Attendee } from "../../../api/models/attendee";
import { EventService } from "../../../providers/event.service";
import { map, catchError, switchMap } from "rxjs/operators";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { RegisterService } from "../../../providers/register.service";
import { AddAdmin, AdminsLoaded, LoadAdmins, OrganizersActionTypes } from "./organizers.actions";

@Injectable()
export class OrganizersEffects {
    constructor(private actions$: Actions,
                private eventService: EventService,
                private registerService: RegisterService) { }

    @Effect()
    loadAdmins$ = this.actions$.pipe(
        ofType<LoadAdmins>(OrganizersActionTypes.LoadAdmins),
        switchMap(() => {
            return this.eventService.getAdmins().pipe(
                map((attendees: Attendee[]) => new AdminsLoaded(attendees)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    addAdmin$ = this.actions$.pipe(
        ofType<AddAdmin>(OrganizersActionTypes.AddAdmin),
        switchMap((action: AddAdmin) => {
            return this.registerService.registerAdmin({
                username: action.payload.email,
                password: action.payload.password,
                attendee: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName
                }
            }).pipe(
                map(() => new LoadAdmins()),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );
}
