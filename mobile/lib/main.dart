import 'package:PolyHxApp/pages/eventdetails.dart';
import 'package:PolyHxApp/pages/eventlist.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/event-management.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:PolyHxApp/pages/login.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/utils/routes.dart';
import 'package:PolyHxApp/redux/reducers/app-state-reducer.dart';
import 'package:PolyHxApp/redux/middlewares/middlewares.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux/flutter_redux.dart';

void main() {
  var client = new Client();
  var tokenService = new TokenService(client);
  var authService = new AuthService(client, tokenService);
  var eventManagementService = new EventManagementService(client, tokenService);

  runApp(new PolyHxApp(authService, tokenService, eventManagementService));
}

class PolyHxApp extends StatelessWidget {
  Store<AppState> store;

  AuthService _authService;
  TokenService _tokenService;
  EventManagementService _eventManagementService;

  PolyHxApp(
      this._authService, this._tokenService, this._eventManagementService) {
    store = new Store<AppState>(appReducer,
        initialState: new AppState(),
        middleware: createEventsMiddleware(_eventManagementService));
  }

  @override
  Widget build(BuildContext context) {
    return new StoreProvider(
        store: store,
        child: new MaterialApp(
            title: 'PolyHx',
            theme: new ThemeData(
              accentColor: Constants.POLYHX_GREY,
              buttonColor: Constants.POLYHX_RED,
              hintColor: Constants.POLYHX_GREY,
              primaryColor: Constants.POLYHX_RED,
              scaffoldBackgroundColor: Colors.white,
              textSelectionColor: Constants.POLYHX_RED,
            ),
            home: new EventList(_tokenService, _eventManagementService),
            onGenerateRoute: (RouteSettings routeSettings) {
              var path = routeSettings.name.split('/');
              switch (path[0]) {
                case Routes.LOGIN:
                  return new MaterialPageRoute(
                      builder: (BuildContext context) =>
                          new LoginPage(_authService),
                      settings: routeSettings);
                case Routes.HOME:
                  return new MaterialPageRoute(
                      builder: (BuildContext context) =>
                          new EventList(_tokenService, _eventManagementService),
                      settings: routeSettings);
                case Routes.EVENT:
                  return new MaterialPageRoute(
                      builder: (BuildContext context) =>
                          new EventDetails(_eventManagementService),
                      settings: routeSettings);
              }
            }));
  }
}
