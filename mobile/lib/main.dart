import 'package:http/http.dart';
import 'package:flutter/material.dart';
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
import 'package:PolyHxApp/redux/middlewares/middlewares.dart';
import 'package:PolyHxApp/redux/reducers/app-state-reducer.dart';
import 'package:PolyHxApp/redux/state.dart';

void main() {
  var client = Client();
  var tokenService = TokenService(client);
  var authService = AuthService(client, tokenService);
  var eventsService = EventsService(client, tokenService);
  var usersService = UsersService(client, tokenService);
  var attendeesService = AttendeesService(client, tokenService);
  var nfcService = NfcService();
  var qrCodeReader = QRCodeReader();
  var store = Store<AppState>(appReducer,
      initialState: AppState(),
      middleware: createEventsMiddleware(eventsService));
  runApp(PolyHxApp(
      authService,
      tokenService,
      eventsService,
      usersService,
      attendeesService,
      nfcService,
      qrCodeReader,
      store
  ));
}

class PolyHxApp extends StatelessWidget {
  final Store<AppState> store;
  final AuthService _authService;
  final TokenService _tokenService;
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final NfcService _nfcService;
  final QRCodeReader _qrCodeReader;

  PolyHxApp(this._authService, this._tokenService, this._eventsService,
      this._usersService, this._attendeesService, this._nfcService,
      this._qrCodeReader, this.store);

  @override
  Widget build(BuildContext context) {
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
              textSelectionColor: Constants.polyhxRed,
            ),
            home: EventList(_tokenService, _eventsService),
            onGenerateRoute: (RouteSettings routeSettings) {
              var path = routeSettings.name.split('/');
              switch (path[0]) {
                case Routes.LOGIN:
                  return MaterialPageRoute(
                      builder: (BuildContext context) =>
                      LoginPage(_authService),
                      settings: routeSettings);
                case Routes.HOME:
                  return MaterialPageRoute(
                      builder: (BuildContext context) =>
                      EventList(_tokenService, _eventsService),
                      settings: routeSettings);
                case Routes.EVENT:
                  return MaterialPageRoute(
                      builder: (BuildContext context) =>
                      EventPage(
                          _eventsService, _usersService, _attendeesService,
                          _nfcService, _qrCodeReader),
                      settings: routeSettings);
              }
            }
        )
    );
  }
}