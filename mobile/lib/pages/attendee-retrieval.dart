import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:PolyHxApp/components/loading-spinner.dart';
import 'package:PolyHxApp/components/pill-button.dart';
import 'package:PolyHxApp/components/pill-textfield.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/pages/attendee-profile.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:PolyHxApp/utils/constants.dart';

class AttendeeRetrievalPage extends StatefulWidget {
  final EventsService _eventsService;
  final UsersService _usersService;
  final NfcService _nfcService;
  final AttendeesService _attendeesService;
  final QRCodeReader _qrCodeReader;
  final Event _event;

  AttendeeRetrievalPage(this._eventsService, this._usersService,
      this._attendeesService, this._nfcService, this._qrCodeReader, this._event);

  @override
  _AttendeeRetrievalPageState createState() =>
      _AttendeeRetrievalPageState(_eventsService, _usersService,
          _attendeesService, _nfcService, _qrCodeReader, _event);
}

class _AttendeeRetrievalPageState extends State<AttendeeRetrievalPage> {
  static const platform = const MethodChannel('app.polyhx.io/nfc');

  final EventsService _eventsService;
  final UsersService _usersService;
  final NfcService _nfcService;
  final AttendeesService _attendeesService;
  final QRCodeReader _qrCodeReader;
  final Event _event;

  User _user;
  Attendee _attendee;
  bool _isLoading = false;
  bool _hasScannedTag = false;
  String _lastScannedTag;

  _AttendeeRetrievalPageState(this._eventsService, this._usersService,
      this._attendeesService, this._nfcService, this._qrCodeReader, this._event);

  _findAttendee(String username) async {
    setState(() {
      _isLoading = true;
    });
    var user = await _usersService.getUserByUsername(username);
    if (user == null) {
      setState(() {
        _isLoading = false;
      });
      showDialog(context: context,
          builder: (_) => _buildAlertDialog('User Not Found',
              'No user with email address $username could be found.'));
      return;
    }
    var attendee = await _attendeesService.getAttendeeByUserId(user.id);
    if (attendee == null) {
      setState(() {
        _isLoading = false;
      });
      showDialog(context: context,
          builder: (_) => _buildAlertDialog('Attendee Not Found',
              'No attendee with email address $username could be found.'));
      return;
    }
    if (!_event.isRegistered(attendee.id)) {
      setState(() {
        _isLoading = false;
      });
      showDialog(context: context,
          builder: (_) => _buildAlertDialog('Attendee not registered',
              'User $username is not registered to this event.'));
      return;
    }
    setState(() {
      _isLoading = false;
      _attendee = attendee;
      _user = user;
    });
  }

  _scanAttendee() async {
    var username = await _qrCodeReader.scan();
    if (username != null) {
      _findAttendee(username);
    }
  }

  _onNfcTagScanned(BuildContext context, String nfcId) async {
    if (nfcId != _attendee.publicId) {
      _lastScannedTag = nfcId;
      setState(() {
        _attendee.publicId = nfcId;
      });
      Scaffold.of(context).showSnackBar(SnackBar(
        content: Text('NFC scanned: $nfcId'),
        action: SnackBarAction(
          label: 'OK',
          onPressed: Scaffold
              .of(context)
              .hideCurrentSnackBar,
        ),
      ));
      _saveAttendee(context);
    }
    else if (nfcId != _lastScannedTag){
      _lastScannedTag = nfcId;
      Scaffold.of(context).showSnackBar(SnackBar(
          content: Text('Attendee already assigned to this tag.',
          style: TextStyle(color: Colors.white)),
        action: SnackBarAction(
        label: 'OK',
        onPressed: Scaffold
        .of(context)
        .hideCurrentSnackBar,
        ),
      ),
      );
      Future.delayed(Duration(seconds: 2), () { _lastScannedTag = null; });
      setState(() {
        _hasScannedTag = true;
      });
    }
  }

  _saveAttendee(BuildContext context) async {
    bool idSaved = await _attendeesService.updateAttendeePublicId(_attendee);
    bool statusSaved = await _eventsService.setAttendeeAsPresent(_event.id, _attendee.id);
    Scaffold.of(context).showSnackBar(SnackBar(
      content: idSaved && statusSaved
             ? Text('Saved attendee info successfully.',
                        style: TextStyle(color: Colors.white))
             : Text('An error occured while saving the attendee info.',
                        style: TextStyle(color: Colors.red)),
      action: SnackBarAction(
        label: 'OK',
        onPressed: Scaffold
            .of(context)
            .hideCurrentSnackBar,
      ),
    ));
    if (idSaved && statusSaved) {
      setState(() {
        _hasScannedTag = true;
      });
    }
  }

  void _clearAttendee() {
    setState(() {
      _user = null;
      _hasScannedTag = false;
      _lastScannedTag = null;
    });
  }

  Widget _buildAlertDialog(String title, String description) {
    return AlertDialog(
      title: Text(title),
      content: Text(description),
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


  Widget _buildSearchBar() {
    return Padding(
      padding: EdgeInsets.all(20.0),
      child: PillTextField(
        keyboardType: TextInputType.emailAddress,
        onSubmitted: (username) => _findAttendee(username),
        decoration: InputDecoration(
          icon: Icon(Icons.search, color: Constants.polyhxRed),
          border: null,
        ),
      ),
    );
  }

  Widget _buildNoAttendeeBody() {
    return _isLoading
        ? Expanded(child: LoadingSpinner())
        : Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(Icons.person,
            size: 240.0,
            color: Constants.polyhxGrey.withAlpha(144),
          ),
          Text('Register attendee',
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

  Widget _buildScanButton() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 50.0),
      child: Align(
        alignment: Alignment.bottomCenter,
        child: PillButton(
          child: Padding(
            padding: EdgeInsets.fromLTRB(35.0, 10.0, 35.0, 10.0),
            child: Icon(Icons.camera_alt,
              color: Colors.white,
              size: 40.0,
            ),
          ),
          enabled: !_isLoading,
          onPressed: _scanAttendee,
        ),
      ),
    );
  }

  Widget _buildAttendeeProfile(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 20.0),
      child: AttendeeProfilePage(
          _attendee, _user, _event.getRegistrationStatus(_attendee.id), _hasScannedTag,
          onDone: _clearAttendee,
          onCancel: _clearAttendee
      ),
    );
  }

  Widget _buildPage(BuildContext context) {
    return _attendee != null && _user != null
        ? _buildAttendeeProfile(context)
        : Column(
      children: <Widget>[
        _buildSearchBar(),
        _buildNoAttendeeBody(),
        _buildScanButton(),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    _nfcService.nfcStream.asBroadcastStream().listen((id) =>
        _onNfcTagScanned(context, id));
    return Center(
      child: _buildPage(context),
    );
  }
}