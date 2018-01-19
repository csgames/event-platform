import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:qrcode_reader/QRCodeReader.dart';
import 'package:PolyHxApp/pages/eventlist.dart';
import 'package:PolyHxApp/pages/event.dart';
import 'package:PolyHxApp/pages/login.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/auth.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:PolyHxApp/utils/routes.dart';

void main() {
  var client = new Client();
  var tokenService = new TokenService(client);
  var authService = new AuthService(client, tokenService);
  var eventsService = new EventsService(client, tokenService);
  var usersService = new UsersService(client, tokenService);
  var attendeesService = new AttendeesService(client, tokenService);
  var qrCodeReader = new QRCodeReader();
  runApp(new PolyHxApp(authService, tokenService, eventsService,
                       usersService, attendeesService, qrCodeReader));
}

class PolyHxApp extends StatelessWidget {
  AuthService _authService;
  TokenService _tokenService;
  EventsService _eventsService;
  UsersService _usersService;
  AttendeesService _attendeesService;
  QRCodeReader _qrCodeReader;

  PolyHxApp(this._authService, this._tokenService, this._eventsService,
            this._usersService, this._attendeesService, this._qrCodeReader);

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'PolyHx',
        theme: new ThemeData(
          accentColor: Constants.POLYHX_GREY,
          buttonColor: Constants.POLYHX_RED,
          hintColor: Constants.POLYHX_GREY,
          primaryColor: Constants.POLYHX_RED,
          scaffoldBackgroundColor: Colors.white,
          textSelectionColor: Constants.POLYHX_RED,
        ),
        home: new EventList(_tokenService, _eventsService),
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
                      new EventList(_tokenService, _eventsService),
                  settings: routeSettings);
            case Routes.EVENT:
              var eventId = path[1];
              return new MaterialPageRoute(
                  builder: (BuildContext context) =>
                      new EventPage(_eventsService, _usersService, _attendeesService, _qrCodeReader, eventId),
                  settings: routeSettings);
          }
        }
    );
  }
}
