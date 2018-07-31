import 'dart:async';
import 'package:PolyHxApp/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
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
  final Activity _activity;

  ActivityPage(this._eventsService, this._usersService,
               this._attendeesService, this._nfcService, this._activity);

  @override
  State<StatefulWidget> createState() =>
      _ActivityPageState(_eventsService, _usersService,
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
    return Center(
      child: Container(
          width: 300.0,
          height: 250.0,
          child: UserProfile(user,
              opacity: 0.9,
              content: Padding(
                padding: EdgeInsets.only(top: 20.0),
                  child: Text(isAlreadyAttending ? 'Already Attending' : 'Signep Up!',
                      style: TextStyle(
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

  Widget _buildTagNotBoundDialog() {
    return AlertDialog(
      title: Text('Tag not bound'),
      content: Text('The scanned NFC tag is not bound to an attendee.'),
      actions: <Widget>[
        FlatButton(
          child: Text('OK',
              style: TextStyle(
                color: Colors.red,
                fontSize: 18.0,
              )
          ),
          onPressed: Navigator
              .of(context)
              .pop,
        ),
      ],
    );
  }

  _addAttendee(BuildContext context, String publicId) async {
    if (publicId == _attendeePublicId) {
      return;
    }
    _attendeePublicId = publicId;
    var attendee = await _attendeesService.getAttendeeByPublicId(_attendeePublicId);
    if (attendee == null) {
      Widget errorDialog = _buildTagNotBoundDialog();
      Future.delayed(Duration(seconds: 1), () {
        if (publicId == _attendeePublicId) {
          _attendeePublicId = null;
        }
      });
      showDialog(context: context, builder: (_) => errorDialog);
      return;
    }
    var user = await _usersService.getUser(attendee.userId);
    if (user == null) {
      return;
    }
    var activity = await _eventsService.addAttendeeToActivity(attendee.id, _activity.id);
    Widget successDialog = _buildUserDialog(user, activity == null);
    Future.delayed(Duration(seconds: 2), () {
      _attendeePublicId = null;
      Navigator.of(context).pop();
    });
    showDialog(context: context, builder: (_) => successDialog);
    if (activity != null) {
      setState(() {
        _activity = activity;
      });
    }
  }

  Widget _buildWinnerDialog(User winner, VoidCallback onDone) {
    return Center(
      child: Container(
        width: 300.0,
        height: 300.0,
        child: UserProfile(winner,
            opacity: 0.85,
            content: Padding(
              padding: EdgeInsets.symmetric(vertical: 10.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(bottom: 20.0),
                    child: Text('Winner!',
                      style: TextStyle(
                        color: Colors.lightBlue,
                        fontWeight: FontWeight.w700,
                        fontSize: 28.0,
                      ),
                    ),
                  ),
                  PillButton(
                    onPressed: onDone,
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                      child: Text('Done',
                        style: TextStyle(
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
      showDialog(context: context, builder: (_) => dialog, barrierDismissible: false);
    }
  }

  Widget _buildBackground() {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(Icons.nfc,
            size: 240.0,
            color: Constants.polyhxGrey.withAlpha(144),
          ),
          Text('Scan to Attend',
              style: TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.w900,
                color: Constants.polyhxGrey.withAlpha(144),
              )
          ),
        ],
      ),
    );
  }

  Widget _buildRaffleButton() {
    return Padding(
        padding: EdgeInsets.symmetric(vertical: 50.0),
        child: Align(
          alignment: Alignment.bottomCenter,
          child: PillButton(
            onPressed: () { _doRaffle(context); },
            child: Padding(
              padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
              child: Text('RAFFLE',
                style: TextStyle(
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

  Widget _buildAttendeeCountWidget() {
    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(top: 30.0),
          child: Text('Attendee count',
            style: TextStyle(
              color: Constants.polyhxGrey.withAlpha(200),
              fontSize: 34.0,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
        Padding(
          padding: EdgeInsets.only(top: 10.0),
          child: Text(_activity.attendees?.length?.toString() ?? '0',
            style: TextStyle(
              color: Constants.polyhxGrey.withAlpha(200),
              fontSize: 34.0,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBody(BuildContext context) {
    return Center(
        child: Column(
          children: <Widget>[
            _buildAttendeeCountWidget(),
            _buildBackground(),
            _buildRaffleButton(),
          ],
        ),
    );
  }

  @override
  Widget build(BuildContext context) {
    _nfcService.nfcStream.asBroadcastStream().listen((id) { _addAttendee(context, id); });
    return Scaffold(
      appBar: AppBar(title: Text(_activity.name)),
      body: _buildBody(context),
      resizeToAvoidBottomPadding: false,
    );
  }
}