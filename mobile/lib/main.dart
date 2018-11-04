import 'package:PolyHxApp/delegates/localization.delegate.dart';
import 'package:PolyHxApp/redux/middlewares/activities-schedule-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/activity-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/attendee-retrieval-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/login-middleware.dart';
import 'package:PolyHxApp/redux/middlewares/profile-middleware.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:PolyHxApp/redux/states/activity-state.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:PolyHxApp/redux/states/login-state.dart';
import 'package:PolyHxApp/services/schedule.service.dart';
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
  var client = Client();
  var tokenService = TokenService(client);
  var authService = AuthService(client, tokenService);
  var eventsService = EventsService(client, tokenService);
  var usersService = UsersService(client, tokenService);
  var attendeesService = AttendeesService(client, tokenService);
  var nfcService = NfcService();
  var qrCodeReader = QRCodeReader();
  var scheduleService = ScheduleService();
  var store = Store<AppState>(
    appReducer,
    initialState: AppState(
      eventState: EventState.loading(),
      loginState: LoginState.initial(),
      activityState: ActivityState.initial(),
      attendeeRetrievalState: AttendeeRetrievalState.initial(),
      activitiesScheduleState: ActivitiesScheduleState.initial()
    ),
    middleware: [
      EpicMiddleware<AppState>(LoginMiddleware(authService)),
      EpicMiddleware<AppState>(ProfileMiddleware(tokenService)),
      EpicMiddleware<AppState>(EventMiddleware(eventsService, tokenService)),
      EpicMiddleware<AppState>(ActivitiesScheduleMiddleware(eventsService, scheduleService)),
      EpicMiddleware<AppState>(ActivityMiddleware(eventsService, nfcService, attendeesService, usersService)),
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