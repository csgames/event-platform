import 'dart:async';

import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class AttendeeRetrievalMiddleware implements EpicClass<AppState> {
  final NfcService _nfcService;
  final AttendeesService _attendeesService;
  final EventsService _eventsService;
  final UsersService _usersService;
  final QRCodeReader _qrCodeReader;
  
  String _lastScannedTag;

  Attendee _attendee;
  Event _event;
  User _user;

  AttendeeRetrievalMiddleware(
    this._nfcService,
    this._attendeesService,
    this._eventsService,
    this._usersService,
    this._qrCodeReader
  );

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<InitAction>())
        .debounce(Duration(milliseconds: 500))
        .switchMap((_) => _listen()),
      Observable(actions)
        .ofType(TypeToken<SearchAction>())
        .switchMap((action) => _search(action.username, action.event)),
      Observable(actions)
        .ofType(TypeToken<ScanAction>())
        .switchMap((action) => _scan(action.event)),
      Observable(actions)
        .ofType(TypeToken<ResetAction>())
        .switchMap((action) => _reset())
    ]);
  }

  Stream<dynamic> _listen() async* {
    await for (var id in _nfcService.nfcStream.asBroadcastStream()) {
      if (id != _attendee.publicId) {
        _lastScannedTag = id;
        _attendee.publicId = id;
        bool idSaved = await _attendeesService.updateAttendeePublicId(_attendee);
        bool statusSaved = await _eventsService.setAttendeeAsPresent(_event.id, _attendee.id);
        yield NfcAssignedAction(idSaved, statusSaved, _attendee, _user);
      } else if (id != _lastScannedTag) {
        _lastScannedTag = null;
        yield NfcAlreadyAssignedAction(_attendee, _user);
      }
      return;
    }
  }

  Stream<dynamic> _search(String username, Event event) async* {
    _event = event;
    _user = await _usersService.getUserByUsername(username);
    if (_user == null) {
      String title = 'User Not Found';
      String description = 'No user with email address $username could be found.';
      yield ErrorAction(title, description);
      return;
    }
    _attendee = await _attendeesService.getAttendeeByUserId(_user.id);
    if (_attendee == null) {
      String title = 'Attendee Not Found';
      String description = 'No attendee with email address $username could be found.';
      yield ErrorAction(title, description);
      return;
    }
    if (!_event.isRegistered(_attendee.id)) {
      String title = 'Attendee not registered';
      String description = 'User $username is not registered to this event.';
      yield ErrorAction(title, description);
      return;
    }
    yield SearchCompletedAction(_attendee, _user);
    return;
  }

  Stream<dynamic> _scan(Event event) async* {
    try {
      String username = await _qrCodeReader.scan();
      if (username != null) {
        yield SearchAction(username, event);
      }
    } catch (err) {
      print(err);
      String title = 'Permission';
      String description = 'You don\'t have the user permission to access the camera.';
      yield ErrorAction(title, description);
    }
  }

  Stream<dynamic> _reset() async* {
    _lastScannedTag = null;
    _attendee = null;
    _user = null;
  }
}