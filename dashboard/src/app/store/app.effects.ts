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
import { PuzzleHeroInfo } from "../api/models/puzzle-hero";
import { ChangePasswordComponent } from "../features/dashboard/modals/change-password/change-password.component";
import { ProfileSettingComponent } from "../features/dashboard/modals/profile-setting/profile-setting.component";
import { TicketComponent } from "../features/dashboard/modals/ticket/ticket.component";
import { AttendeeService } from "../providers/attendee.service";
import { AuthenticationService } from "../providers/authentication.service";
import { EventService } from "../providers/event.service";
import { NotificationService } from "../providers/notification.service";
import { PuzzleHeroService } from "../providers/puzzle-hero.service";
import {
    AllNotificationsSeen,
    AppActionTypes,
    AppLoaded,
    ChangeLanguage,
    ChangePassword,
    CheckUnseenNotification,
    CurrentAttendeeLoaded,
    EditProfile,
    EventsLoaded,
    GetPuzzleHeroInfo,
    GlobalError,
    HasUnseenNotification,
    InitializeMessaging,
    LoadCurrentAttendee,
    LoadEvents,
    LoadRegisteredCompetitions,
    Logout,
    RegisteredCompetitionsLoaded,
    SetCurrentEvent,
    SetupMessagingToken,
    UpdatePuzzleHeroStatus,
    ViewTicket
} from "./app.actions";
import { getCurrentAttendee, getEvents, getPuzzleHeroInfo, State } from "./app.reducers";
import { Competition } from "../api/models/competition";
import { ThemeService } from "../providers/theme.service";

export const LANGUAGE = "LANGUAGE";

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
        private afMessaging: AngularFireMessaging,
        private puzzleHeroService: PuzzleHeroService,
        private themeService: ThemeService
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
            this.themeService.resetTheme();
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
            localStorage.setItem(LANGUAGE, action.payload);
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
        ofType(AppActionTypes.CurrentAttendeeLoaded, AppActionTypes.EventsLoaded, AppActionTypes.UpdatePuzzleHeroStatus),
        withLatestFrom(
            this.store$.pipe(select(getCurrentAttendee)),
            this.store$.pipe(select(getEvents)),
            this.store$.pipe(select(getPuzzleHeroInfo))
        ),
        filter(([action, attendee, events, status]: [any, Attendee, Event[], PuzzleHeroInfo]) => {
            return [attendee, events, status].filter(x => x).length === 3;
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
        tap((action) => {
            if (action.event) {
                this.eventService.saveCurrentEvent(action.event._id);
                this.themeService.setPrimaryColor(action.event.primaryColor);
                this.router.navigate(["/"]);
            }
        }),
        switchMap(() => [new LoadCurrentAttendee(), new GetPuzzleHeroInfo(), new LoadRegisteredCompetitions()])
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
    viewTicket$ = this.actions$.pipe(
        ofType<ViewTicket>(AppActionTypes.ViewTicket),
        map(() => {
            this.modalService.addModal(TicketComponent);
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

    @Effect()
    getPuzzleHeroInfo$ = this.actions$.pipe(
        ofType<GetPuzzleHeroInfo>(AppActionTypes.GetPuzzleHeroInfo),
        switchMap(() => {
            return this.puzzleHeroService.getInfo().pipe(
                map((info: PuzzleHeroInfo) => new UpdatePuzzleHeroStatus(info))
            );
        })
    );

    @Effect()
    loadRegisteredCompetitions$ = this.actions$.pipe(
        ofType<LoadRegisteredCompetitions>(AppActionTypes.LoadRegisteredCompetitions),
        switchMap(() => {
            return this.eventService.getRegisteredCompetitions().pipe(
                map((competitions: Competition[]) => new RegisteredCompetitionsLoaded(competitions))
            );
        })
    );
}
