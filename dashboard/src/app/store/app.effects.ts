import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { catchError, delay, filter, map, mergeMapTo, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Attendee } from "../api/models/attendee";
import { Event } from "../api/models/event";
import { ChangePasswordComponent } from "../features/dashboard/modals/change-password/change-password.component";
import { ProfileSettingComponent } from "../features/dashboard/modals/profile-setting/profile-setting.component";
import { AttendeeService } from "../providers/attendee.service";
import { AuthenticationService } from "../providers/authentication.service";
import { EventService } from "../providers/event.service";
import { NotificationService } from "../providers/notification.service";
import {
    AllNotificationsSeen, AppActionTypes, AppLoaded, ChangeLanguage, ChangePassword, CheckUnseenNotification, CurrentAttendeeLoaded,
    EditProfile, EventsLoaded, GlobalError, HasUnseenNotification, InitializeMessaging, LoadCurrentAttendee, LoadEvents, Logout,
    SetCurrentEvent, SetupMessagingToken
} from "./app.actions";
import { getCurrentAttendee, getEvents, State } from "./app.reducers";
import { promise } from "selenium-webdriver";
import delayed = promise.delayed;

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
        private toastr: ToastrService,
        private notificationService: NotificationService,
        private afMessaging: AngularFireMessaging
    ) {}

    @Effect()
    checkUnseenNotification$ = this.actions$.pipe(
        ofType<CheckUnseenNotification>(AppActionTypes.CheckUnseenNotification),
        switchMap(() => {
            return this.notificationService.checkUnseenNotification().pipe(
                map((notifications) => {
                    if (notifications.length > 0) { return new HasUnseenNotification(); }
                    return new AllNotificationsSeen();
                }),
                catchError((err) => of(new GlobalError(err)))
            );
        })
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AppActionTypes.Logout),
        tap(async () => {
            const token = await this.afMessaging.getToken.toPromise();
            if (token) {
                await this.attendeeService.removeMessagingToken(token).toPromise();
            }
        }),
        delay(500),
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
        delay(1000),
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
            this.modalService.addModal(ProfileSettingComponent);
        })
    );

    @Effect({ dispatch: false })
    changePassword$ = this.actions$.pipe(
        ofType<ChangePassword>(AppActionTypes.ChangePassword),
        map(() => {
            this.modalService.addModal(ChangePasswordComponent);
        })
    );

    @Effect({ dispatch: false })
    initializeMessaging$ = this.actions$.pipe(
        ofType<InitializeMessaging>(AppActionTypes.InitializeMessaging),
        map(() => {
            const sub$ = this.afMessaging.requestPermission
                .pipe(
                    mergeMapTo(this.afMessaging.tokenChanges),
                    filter((token) => !!token))
                .subscribe((token) => {
                    sub$.unsubscribe();
                    this.store$.dispatch(new SetupMessagingToken(token));
                });
        })
    );

    @Effect({ dispatch: false })
    setupMessagingToken$ = this.actions$.pipe(
        ofType<SetupMessagingToken>(AppActionTypes.SetupMessagingToken),
        switchMap((action: SetupMessagingToken) => {
            return this.attendeeService.addMessagingToken(action.payload);
        })
    );
}
