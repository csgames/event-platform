import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/redux/actions/profile-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/events.service.dart';
import 'package:CSGamesApp/services/team.service.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ProfileMiddleware extends EpicClass<AppState> {
  final QRCodeReader _qrCodeReader;
  final AttendeesService _attendeesService;
  final EventsService _eventsService;
  final TeamService _teamService;

  ProfileMiddleware(
      this._qrCodeReader,
      this._attendeesService,
      this._eventsService,
      this._teamService
  );

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
        Observable(actions)
            .ofType(TypeToken<ScanAction>())
            .switchMap((action) => _scan(store.state.currentEvent, store.state.currentAttendee.id, action.errorMessages)),
        Observable(actions)
            .ofType(TypeToken<GetCurrentTeamAction>())
            .switchMap((_) => _fetchTeam())
    ]);
  }

    Stream<dynamic> _fetchTeam() async* {
        yield SetCurrentTeamAction(await this._teamService.getTeamInfo());
    }

  Stream<dynamic> _scan(Event event, String attendeeId, Map<String, String> errorMessages) async* {
    try {
      String scannedValue = await _qrCodeReader.scan();
      if (scannedValue == null) return;
      
      Attendee scannedAttendee = await _attendeesService.getAttendeeByPublicId(scannedValue);
      if (scannedAttendee == null) {
        yield ErrorAction(errorMessages['scan-title'], errorMessages['scan-desc']);
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

      bool result = await _eventsService.addScannedAttendee(attendeeId, scannedAttendee.id);
      
      if (result) yield ScannedAction();
      else yield ErrorAction(errorMessages['twice-title'], errorMessages['twice-desc']);
    } catch (err) {
      print('An error occured while trying to scan for qr code: $err');
      yield ErrorAction(errorMessages['permission-title'], errorMessages['permission-desc']);
    }
  }
}