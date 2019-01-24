import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/domain/user.dart';
import 'package:CSGamesApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:CSGamesApp/services/nfc.service.dart';
import 'package:CSGamesApp/services/users.service.dart';
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
        .switchMap((action) => _search(action.username, action.event, action.errorMessages)),
      Observable(actions)
        .ofType(TypeToken<ScanAction>())
        .switchMap((action) => _scan(action.event, action.errorMessages)),
      Observable(actions)
        .ofType(TypeToken<ResetAttendeeAction>())
        .switchMap((action) => _reset()),
      Observable(actions)
        .ofType(TypeToken<GetCurrentAttendeeAction>())
        .switchMap((_)  => _getCurrentAttendee())
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

  Stream<dynamic> _search(String username, Event event, Map<String, String> errorMessages) async* {
    _event = event;
    _user = await _usersService.getUserByUsername(username);
    if (_user == null) {
      yield ErrorAction(errorMessages['user-title'], errorMessages['user-desc'] + username);
      return;
    }
    _attendee = await _attendeesService.getAttendeeByUserId(_user.id);
    if (_attendee == null) {
      yield ErrorAction(errorMessages['attendee-title'], errorMessages['attendee-desc'] + username);
      return;
    }
    if (!_event.isRegistered(_attendee.id)) {
      yield ErrorAction(errorMessages['register-title'], username + errorMessages['register-desc']);
      return;
    }
    yield SearchCompletedAction(_attendee, _user);
    return;
  }

  Stream<dynamic> _scan(Event event, Map<String, String> errorMessages) async* {
    try {
      String username = await _qrCodeReader.scan();
      if (username != null) {
        yield SearchAction(username, event, errorMessages);
      }
    } catch (err) {
      print('An error occured while trying to scan for qr code: $err');
      yield ErrorAction(errorMessages['permission-title'], errorMessages['permission-desc']);
    }
  }

  Stream<dynamic> _reset() async* {
    _lastScannedTag = null;
    _attendee = null;
    _user = null;
  }

  Stream<dynamic> _getCurrentAttendee() async* {
    yield SetCurrentAttendeeAction(await _attendeesService.getAttendeeInfo());
  }
}