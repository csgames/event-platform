import 'package:PolyHxApp/delegates/localization.delegate.dart';
import 'package:PolyHxApp/redux/middlewares/activities-schedule-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/activities-subscription-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/activity-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/attendee-retrieval-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/login-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/notification-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/profile-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/sponsors-middleware.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/redux/states/activities-subscription-state.dart';
import 'package:PolyHxApp/redux/states/activity-state.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:PolyHxApp/redux/states/login-state.dart';
import 'package:PolyHxApp/redux/states/notification-state.dart';
import 'package:PolyHxApp/redux/states/profile-state.dart';
import 'package:PolyHxApp/redux/states/sponsors-state.dart';
import 'package:PolyHxApp/services/activities.service.dart';
import 'package:PolyHxApp/services/notification.service.dart';
import 'package:PolyHxApp/services/schedule.service.dart';
import 'package:PolyHxApp/services/sponsors.service.dart';
import 'package:PolyHxApp/utils/http-client.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux/redux.dart';
import 'package:PolyHxApp/pages/event.dart';
import 'package:PolyHxApp/pages/event-list.dart';
import 'package:PolyHxApp/pages/login.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:PolyHxApp/utils/routes.dart';
import 'package:PolyHxApp/redux/middlewares/event-middleware.dart';
import 'package:PolyHxApp/redux/reducers/app-state-reducer.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:redux_epics/redux_epics.dart';

void main() {
    final client = Client();
    final nfcService = NfcService();
    final qrCodeReader = QRCodeReader();
    final scheduleService = ScheduleService();
    final tokenService = TokenService(client);
    final firebaseMessaging = FirebaseMessaging();
    final httpClient = HttpClient(client, tokenService);
    final authService = AuthService(client, tokenService);
    final usersService = UsersService(httpClient);
    final eventsService = EventsService(httpClient);
    final sponsorsService = SponsorsService(httpClient);
    final attendeesService = AttendeesService(httpClient);
    final activitiesService = ActivitiesService(httpClient);
    final notificationService = NotificationService(httpClient);
    final store = Store<AppState>(
        appReducer,
        initialState: AppState(
            eventState: EventState.loading(),
            loginState: LoginState.initial(),
            profileState: ProfileState.initial(),
            activityState: ActivityState.initial(),
            sponsorsState: SponsorsState.initial(),
            notificationState: NotificationState.initial(),
            attendeeRetrievalState: AttendeeRetrievalState.initial(),
            activitiesScheduleState: ActivitiesScheduleState.initial(),
            activitiesSubscriptionState: ActivitiesSubscriptionState.initial()
        ),
        middleware: [
            EpicMiddleware<AppState>(SponsorsMiddleware(sponsorsService)),
            EpicMiddleware<AppState>(EventMiddleware(eventsService, tokenService)),
            EpicMiddleware<AppState>(ActivityDescriptionMiddleware(activitiesService)),
            EpicMiddleware<AppState>(ActivitiesScheduleMiddleware(eventsService, scheduleService)),
            EpicMiddleware<AppState>(LoginMiddleware(authService, firebaseMessaging, attendeesService)),
            EpicMiddleware<AppState>(ProfileMiddleware(tokenService, qrCodeReader, attendeesService, eventsService)),
            EpicMiddleware<AppState>(NotificationMiddleware(notificationService, firebaseMessaging, attendeesService)),
            EpicMiddleware<AppState>(ActivityMiddleware(eventsService, nfcService, attendeesService, usersService, activitiesService)),
            EpicMiddleware<AppState>(AttendeeRetrievalMiddleware(nfcService, attendeesService, eventsService, usersService, qrCodeReader))
        ]
    );
    runApp(PolyHxApp(store));
}

class PolyHxApp extends StatelessWidget {
    final Store<AppState> store;

    PolyHxApp(this.store);

    @override
    Widget build(_) {
        return StoreProvider(
            store: store,
            child: MaterialApp(
                title: 'PolyHx',
                theme: ThemeData(
                    platform: TargetPlatform.android,
                    accentColor: Colors.lightBlue,
                    buttonColor: Constants.polyhxRed,
                    hintColor: Constants.polyhxGrey,
                    primaryColor: Constants.polyhxRed,
                    scaffoldBackgroundColor: Colors.white,
                    textSelectionColor: Constants.polyhxRed
                ),
                home: EventList(),
                onGenerateRoute: (RouteSettings routeSettings) {
                    String path = routeSettings.name.split('/')[0];
                    switch (path) {
                        case Routes.LOGIN:
                            return MaterialPageRoute(
                                builder: (_) => LoginPage(),
                                settings: routeSettings
                            );
                        case Routes.HOME:
                            return MaterialPageRoute(
                                builder: (_) => EventList(),
                                settings: routeSettings
                            );
                        case Routes.EVENT:
                            return MaterialPageRoute(
                                builder: (_) => EventPage(),
                                settings: routeSettings
                            );
                    }
                },
                localizationsDelegates: [
                    LanguageDelegate(),
                    GlobalMaterialLocalizations.delegate,
                    GlobalWidgetsLocalizations.delegate
                ],
                supportedLocales: [Locale('en', 'CA'), Locale('fr', 'CA')]
            )
        );
    }
}