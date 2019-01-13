import 'dart:async';

import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/profile-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/token.service.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ProfileMiddleware extends EpicClass<AppState> {
  final TokenService _tokenService;
  final QRCodeReader _qrCodeReader;
  final AttendeesService _attendeesService;
  final EventsService _eventsService;

  ProfileMiddleware(this._tokenService, this._qrCodeReader, this._attendeesService, this._eventsService);

  @override
  Stream call(Stream actions, EpicStore store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<GetCurrentUserAction>())
        .switchMap((action) => _set(action.completer)),
      Observable(actions)
        .ofType(TypeToken<ScanAction>())
        .switchMap((action) => _scan(action.attendeeId, action.event, action.errorMessages))
    ]);
  }

  Stream<dynamic> _set(Completer completer) async* {
    User user = _tokenService.getCurrentUser();
    completer.complete(user.id);
    yield SetCurrentUserAction(user);
  }

  Stream<dynamic> _scan(String attendeeId, Event event, Map<String, String> errorMessages) async* {
    try {
      String scannedValue = await _qrCodeReader.scan();
      if (scannedValue == null) return;
      
      Attendee scannedAttendee = await _attendeesService.getAttendeeByUserId(scannedValue);
      if (scannedAttendee == null) {
        yield ErrorAction(errorMessages['scan-title'], errorMessages['scan-desc']);
        return;
      }

      if (attendeeId == null) {
        yield ErrorAction(errorMessages['attendee-title'], errorMessages['attendee-desc']);
        return;
      }

      if (attendeeId == scannedAttendee.id) {
        yield ErrorAction(errorMessages['same-title'], errorMessages['same-desc']);
        return;
      }

      if (!event.isRegistered(attendeeId)) {
        yield ErrorAction(errorMessages['register-title'], errorMessages['register-desc']);
        return;
      }

      if (!event.isRegistered(scannedAttendee.id)) {
        yield ErrorAction(errorMessages['register-scan-title'], errorMessages['register-scan-desc']);
        return;
      }

      bool result = await _eventsService.addScannedAttendee(attendeeId, scannedAttendee.id, event.id);
      
      if (result) yield ScannedAction();
      else yield ErrorAction(errorMessages['save-title'], errorMessages['save-desc']);
    } catch (err) {
      print('An error occured while trying to scan for qr code: $err');
      yield ErrorAction(errorMessages['permission-title'], errorMessages['permission-desc']);
    }
  }
}