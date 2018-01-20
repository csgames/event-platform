import 'dart:async';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/src/material/scaffold.dart';
import 'package:intl/intl.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/components/user-profile.dart';
import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/users.service.dart';

class ActivityPage extends StatefulWidget {
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final NfcService _nfcService;
  Activity _activity;

  ActivityPage(this._eventsService, this._usersService,
               this._attendeesService, this._nfcService, this._activity);

  @override
  State<StatefulWidget> createState() =>
      new _ActivityPageState(_eventsService, _usersService,
                             _attendeesService, _nfcService, _activity);
}

class _ActivityPageState extends State<ActivityPage> {
  final EventsService _eventsService;
  final UsersService _usersService;
  final AttendeesService _attendeesService;
  final NfcService _nfcService;

  Activity _activity;
  String _attendeePublicId;

  _ActivityPageState(this._eventsService, this._usersService,
                     this._attendeesService, this._nfcService, this._activity);

  Widget _buildUserDialog(User user, bool isAlreadyAttending) {
    return new Center(
      child: new Container(
          width: 300.0,
          height: 250.0,
          child: new UserProfile(user,
              opacity: 0.9,
              content: new Padding(
                padding: new EdgeInsets.only(top: 20.0),
                  child: new Text(isAlreadyAttending ? 'Already Attending' : 'Signep Up!',
                      style: new TextStyle(
                        color: isAlreadyAttending ? Colors.red : Colors.green,
                        fontWeight: FontWeight.w700,
                        fontSize: 24.0,
                      ),
                  ),
              ),
          ),
      ),
    );
  }

  _addAttendee(BuildContext context, String publicId) async {
    if (publicId == _attendeePublicId) {
      return;
    }
    _attendeePublicId = publicId;
    var attendee = await _attendeesService.getAttendeeByPublicId(_attendeePublicId);
    if (attendee == null) {
      return;
    }
    var user = await _usersService.getUser(attendee.userId);
    if (user == null) {
      return;
    }
    bool wasAdded = await _eventsService.addAttendeeToActivity(attendee.id, _activity.id);
    Widget dialog = _buildUserDialog(user, !wasAdded);
    new Future.delayed(new Duration(seconds: 2), () {
      if (publicId == _attendeePublicId) {
        _attendeePublicId = null;
        Navigator.of(context).pop();
      }
    });
    showDialog(context: context, child: dialog);
  }

  Widget _buildWinnerDialog(User winner, VoidCallback onDone) {
    return new Center(
      child: new Container(
        width: 300.0,
        height: 300.0,
        child: new UserProfile(winner,
            opacity: 0.85,
            content: new Padding(
              padding: new EdgeInsets.symmetric(vertical: 10.0),
              child: new Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  new Padding(
                    padding: new EdgeInsets.only(bottom: 20.0),
                    child: new Text('Winner!',
                      style: new TextStyle(
                        color: Colors.lightBlue,
                        fontWeight: FontWeight.w700,
                        fontSize: 28.0,
                      ),
                    ),
                  ),
                  new PillButton(
                    onPressed: onDone,
                    child: new Padding(
                      padding: new EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                      child: new Text('Done',
                        style: new TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20.0,
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
        ),
      ),
    );
  }

  _doRaffle(BuildContext context) async {
    var winner = await _eventsService.doRaffle(_activity.id);
    if (winner != null && winner.username != null) {
      var dialog = _buildWinnerDialog(winner, Navigator.of(context).pop);
      showDialog(context: context, child: dialog, barrierDismissible: false);
    }
  }

  Widget _buildBackground() {
    return new Expanded(
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new Icon(Icons.nfc,
            size: 240.0,
            color: Constants.POLYHX_GREY.withAlpha(144),
          ),
          new Text('Scan to Attend',
              style: new TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.w900,
                color: Constants.POLYHX_GREY.withAlpha(144),
              )
          ),
        ],
      ),
    );
  }

  Widget _buildRaffleButton() {
    return new Padding(
        padding: new EdgeInsets.only(bottom: 70.0),
        child: new Align(
          alignment: Alignment.bottomCenter,
          child: new PillButton(
            onPressed: () { _doRaffle(context); },
            child: new Padding(
              padding: new EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
              child: new Text('RAFFLE',
                style: new TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 20.0,
                ),
              ),
            ),
          )
        )
    );
  }

  Widget _buildBody(BuildContext context) {
    return new Center(
        child: new Column(
          children: <Widget>[
            _buildBackground(),
            _buildRaffleButton(),
          ],
        ),
    );
  }

  @override
  Widget build(BuildContext context) {
    _nfcService.NfcStream.asBroadcastStream().listen((id) { _addAttendee(context, id); });
    return new Scaffold(
      appBar: new AppBar(title: new Text(_activity.name)),
      body: _buildBody(context),
      resizeToAvoidBottomPadding: false,
    );
  }
}