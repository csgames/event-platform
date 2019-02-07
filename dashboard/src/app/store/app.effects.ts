import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthenticationService } from "../providers/authentication.service";
import {
    AppActionTypes, AppLoaded,
    ChangeLanguage,
    CurrentAttendeeLoaded,
    EditProfile,
    EventsLoaded,
    GlobalError,
    LoadCurrentAttendee,
    LoadEvents,
    Logout,
    SetCurrentEvent
} from "./app.actions";
import { catchError, filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Router } from "@angular/router";
import { AttendeeService } from "../providers/attendee.service";
import { Event } from "../api/models/event";
import { Attendee } from "../api/models/attendee";
import { of } from "rxjs";
import { EventService } from "../providers/event.service";
import { SimpleModalService } from "ngx-simple-modal";
import { ProfileSettingComponent } from "../features/dashboard/modals/profile-setting/profile-setting.component";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { select, Store } from "@ngrx/store";
import { getCurrentAttendee, getEvents, State } from "./app.reducers";

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<State>,
        private authenticationService: AuthenticationService,
        private attendeeService: AttendeeService,
        private eventService: EventService,
        private router: Router,
        private modalService: SimpleModalService,
        private translateService: TranslateService,
        private toastr: ToastrService
    ) {}

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AppActionTypes.Logout),
        switchMap(() => {
            return this.authenticationService.logout().pipe(
                tap(() => {
                    this.router.navigate(["/login"]);
                })
            );
        })
    );

    @Effect({ dispatch: false })
    changeLanguage$ = this.actions$.pipe(
        ofType<ChangeLanguage>(AppActionTypes.ChangeLanguage),
        tap((action: ChangeLanguage) => { 
            this.translateService.setDefaultLang(action.payload);
        })
    );

    @Effect({ dispatch: false })
    globalError$ = this.actions$.pipe(
        ofType<GlobalError>(AppActionTypes.GlobalError),
        tap((globalError: GlobalError) => {
            this.toastr.error(globalError.payload.message, "Error", {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                timeOut: 10000
            });
        })
    );

    @Effect()
    appLoaded$ = this.actions$.pipe(
        ofType(AppActionTypes.CurrentAttendeeLoaded, AppActionTypes.EventsLoaded),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee)), this.store$.pipe(select(getEvents))),
        filter(([action, attendee, events]: [any, Attendee, Event[]]) => {
            return [attendee, events].filter(x => x).length === 2;
        }),
        map(() => new AppLoaded())
    );

    @Effect()
    loadCurrentAttendee$ = this.actions$.pipe(
        ofType<LoadCurrentAttendee>(AppActionTypes.LoadCurrentAttendee),
        switchMap(() => {
            return this.attendeeService.getAttendeeInfo().pipe(
                map((a: Attendee) => new CurrentAttendeeLoaded(a)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    loadEvents$ = this.actions$.pipe(
        ofType<LoadEvents>(AppActionTypes.LoadEvents),
        switchMap(() => {
            return this.eventService.getEventList().pipe(
                map((e: Event[]) => new EventsLoaded(e)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    eventsLoaded$ = this.actions$.pipe(
        ofType<EventsLoaded>(AppActionTypes.EventsLoaded),
        filter((action: EventsLoaded) => action.events.length > 0),
        map((action: EventsLoaded) => {
                const currentEventId = this.eventService.getCurrentEvent();
                const event = action.events.find((e) => e._id === currentEventId);
                if (event) {
                    return new SetCurrentEvent(event);
                }
                return new SetCurrentEvent(action.events[0]);
            }
        )
    );

    @Effect()
    setCurrentEvent$ = this.actions$.pipe(
        ofType<SetCurrentEvent>(AppActionTypes.SetCurrentEvent),
        tap((action) => this.eventService.saveCurrentEvent(action.event._id)),
        map(() => new LoadCurrentAttendee())
    );

    @Effect({ dispatch: false })
    editProfile$ = this.actions$.pipe(
        ofType<EditProfile>(AppActionTypes.EditProfile),
        map(() => {
            const modal = this.modalService.addModal(ProfileSettingComponent);
        })
    );
}
