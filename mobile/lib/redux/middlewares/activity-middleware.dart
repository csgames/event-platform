import 'dart:async';

import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/domain/attendee.dart';
import 'package:PolyHxApp/domain/user.dart';
import 'package:PolyHxApp/redux/actions/activity-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/attendees.service.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/nfc.service.dart';
import 'package:PolyHxApp/services/users.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ActivityMiddleware implements EpicClass<AppState> {
  final EventsService _eventsService;
  final NfcService _nfcService;
  final AttendeesService _attendeesService;
  final UsersService _usersService;

  String _attendeePublicId;

  ActivityMiddleware(
    this._eventsService,
    this._nfcService,
    this._attendeesService,
    this._usersService
  );

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable.merge([
      Observable(actions)
        .ofType(TypeToken<RaffleAction>())
        .switchMap((action) => _raffle(action.activityId)),
      Observable(actions)
        .ofType(TypeToken<InitAction>())
        .debounce(Duration(milliseconds: 500))
        .switchMap((action) => _listen(action.activityId, action.errorMessages))
    ]);
  }

  Stream<dynamic> _raffle(String id) async* {
    try {
      yield WinnerSelected(await _eventsService.doRaffle(id));
    } catch (err) {
      print('An error occured while doing the raffle: $err');
      yield RaffleError();
    }
  }

  Stream<dynamic> _listen(String activityId, Map<String, String> errorMessages) async* {
    await for (String id in _nfcService.nfcStream.asBroadcastStream()) {
      if (id == _attendeePublicId) {
        return;
      }

      _attendeePublicId = id;
      Attendee attendee = await _attendeesService.getAttendeeByPublicId(_attendeePublicId);
      if (attendee == null) {
        _attendeePublicId = null;
        yield ScanError(errorMessages['tag-title'], errorMessages['tag-desc']);
        return;
      }

      User user = await _usersService.getUser(attendee.userId);
      if (user == null) {
        yield ScanError(errorMessages['user-title'], errorMessages['user-desc']);
        return;
      }

      Activity activity = await _eventsService.addAttendeeToActivity(attendee.id, activityId);
      _attendeePublicId = null;
      yield AttendeeScanned(activity, user);
      print('Attendee Scanned.');
      return;
    }
  }
}
