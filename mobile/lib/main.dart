import 'package:CSGamesApp/delegates/localization.delegate.dart';
import 'package:CSGamesApp/redux/middlewares/activities-schedule-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/activities-subscription-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/activity-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/attendee-retrieval-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/guide-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/login-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/notification-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/profile-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/puzzle-hero-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/puzzle-middleware.dart';
import 'package:CSGamesApp/redux/middlewares/sponsors-middleware.dart';
import 'package:CSGamesApp/redux/states/activities-schedule-state.dart';
import 'package:CSGamesApp/redux/states/activities-subscription-state.dart';
import 'package:CSGamesApp/redux/states/activity-state.dart';
import 'package:CSGamesApp/redux/states/attendee-retrieval-state.dart';
import 'package:CSGamesApp/redux/states/event-state.dart';
import 'package:CSGamesApp/redux/states/guide-state.dart';
import 'package:CSGamesApp/redux/states/login-state.dart';
import 'package:CSGamesApp/redux/states/notification-state.dart';
import 'package:CSGamesApp/redux/states/profile-state.dart';
import 'package:CSGamesApp/redux/states/puzzle-state.dart';
import 'package:CSGamesApp/redux/states/sponsors-state.dart';
import 'package:CSGamesApp/services/activities.service.dart';
import 'package:CSGamesApp/services/puzzle-hero.service.dart';
import 'package:CSGamesApp/services/schedule.service.dart';
import 'package:CSGamesApp/services/team.service.dart';
import 'package:CSGamesApp/utils/http-client.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux/redux.dart';
import 'package:CSGamesApp/pages/event.dart';
import 'package:CSGamesApp/pages/event-list.dart';
import 'package:CSGamesApp/pages/login.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/auth.service.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:CSGamesApp/services/nfc.service.dart';
import 'package:CSGamesApp/utils/constants.dart';
import 'package:CSGamesApp/utils/routes.dart';
import 'package:CSGamesApp/redux/middlewares/event-middleware.dart';
import 'package:CSGamesApp/redux/reducers/app-state-reducer.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:redux_epics/redux_epics.dart';

void mainDelegate() {
    WidgetsFlutterBinding.ensureInitialized();

    final client = Client();
    final nfcService = NfcService();
    final qrCodeReader = QRCodeReader();
    final httpClient = HttpClient(client);
    final scheduleService = ScheduleService();
    final teamService = TeamService(httpClient);
    final authService = AuthService(httpClient);
    final firebaseMessaging = FirebaseMessaging();
    final eventsService = EventsService(httpClient);
    final attendeesService = AttendeesService(httpClient);
    final puzzleHeroService = PuzzleHeroService(httpClient);
    final activitiesService = ActivitiesService(httpClient);
    final store = Store<AppState>(
        appReducer,
        initialState: AppState(
            guideState: GuideState.initial(),
            eventState: EventState.loading(),
            loginState: LoginState.initial(),
            profileState: ProfileState.initial(),
            puzzlesState: PuzzlesState.initial(),
            activityState: ActivityState.initial(),
            sponsorsState: SponsorsState.initial(),
            notificationState: NotificationState.initial(),
            attendeeRetrievalState: AttendeeRetrievalState.initial(),
            activitiesScheduleState: ActivitiesScheduleState.initial(),
            activitiesSubscriptionState: ActivitiesSubscriptionState.initial()
        ),
        middleware: [
            EpicMiddleware<AppState>(GuideMiddleware(eventsService)),
            EpicMiddleware<AppState>(SponsorsMiddleware(eventsService)),
            EpicMiddleware<AppState>(PuzzleHeroMiddleware(puzzleHeroService)),
            EpicMiddleware<AppState>(ActivityDescriptionMiddleware(activitiesService)),
            EpicMiddleware<AppState>(PuzzleMiddleware(puzzleHeroService, qrCodeReader)),
            EpicMiddleware<AppState>(EventMiddleware(eventsService, authService, httpClient)),
            EpicMiddleware<AppState>(ActivitiesScheduleMiddleware(eventsService, scheduleService)),
            EpicMiddleware<AppState>(LoginMiddleware(authService, firebaseMessaging, attendeesService)),
            EpicMiddleware<AppState>(ProfileMiddleware(qrCodeReader, attendeesService, eventsService, teamService)),
            EpicMiddleware<AppState>(ActivityMiddleware(nfcService, attendeesService, activitiesService, teamService)),
            EpicMiddleware<AppState>(AttendeeRetrievalMiddleware(nfcService, attendeesService, qrCodeReader, teamService)),
            EpicMiddleware<AppState>(NotificationMiddleware(firebaseMessaging, attendeesService, eventsService, activitiesService))
        ]
    );
    runApp(CSGamesApp(store));
}

class CSGamesApp extends StatelessWidget {
    final Store<AppState> store;

    CSGamesApp(this.store);

    @override
    Widget build(_) {
        return StoreProvider(
            store: store,
            child: MaterialApp(
                title: 'CSGames',
                debugShowCheckedModeBanner: true,
                theme: ThemeData(
                    accentColor: Colors.lightBlue,
                    buttonColor: Constants.csRed,
                    hintColor: Constants.polyhxGrey,
                    primaryColor: Constants.csRed,
                    scaffoldBackgroundColor: Colors.white,
                    textSelectionColor: Constants.csRed
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