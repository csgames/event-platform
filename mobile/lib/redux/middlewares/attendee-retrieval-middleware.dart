import 'dart:async';

import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/nfc.service.dart';
import 'package:CSGamesApp/services/team.service.dart';
import 'package:qr_reader/qr_reader.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class AttendeeRetrievalMiddleware implements EpicClass<AppState> {
    final NfcService _nfcService;
    final AttendeesService _attendeesService;
    final QRCodeReader _qrCodeReader;
    final TeamService _teamService;
    
    Attendee _attendee;

    AttendeeRetrievalMiddleware(
        this._nfcService,
        this._attendeesService,
        this._qrCodeReader,
        this._teamService
    );

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
        Observable(actions)
            .ofType(TypeToken<InitAction>())
            .debounce(Duration(milliseconds: 500))
            .switchMap((_) => _listen(actions)),
        Observable(actions)
            .ofType(TypeToken<SearchAction>())
            .switchMap((action) => _search(action.username, store.state.currentEvent, action.errorMessages)),
        Observable(actions)
            .ofType(TypeToken<ScanAction>())
            .switchMap((action) => _scan(action.errorMessages)),
        Observable(actions)
            .ofType(TypeToken<ResetAttendeeAction>())
            .switchMap((action) => _reset()),
        Observable(actions)
            .ofType(TypeToken<GetCurrentAttendeeAction>())
            .switchMap((action)  => _getCurrentAttendee(action.completer))
        ]);
    }

    Stream<dynamic> _listen(Stream<dynamic> actions) {
        return Observable(_nfcService.nfcStream.asBroadcastStream())
            .takeUntil(actions.where((action) => action is UnsubscribeAction))
            .asyncMap((id) async {
                Attendee attendee = await _attendeesService.getAttendeeByPublicId(id);
                if (attendee != null) {
                    return NfcAlreadyAssignedAction(_attendee);
                } else if (id != _attendee.publicId) {
                    _attendee.publicId = id;
                    bool idSaved = await _attendeesService.updateAttendeePublicId(_attendee);
                    return NfcAssignedAction(idSaved, _attendee);
                }
            });
    }

    Stream<dynamic> _search(String username, Event event, Map<String, String> errorMessages) async* {
        _attendee = await _attendeesService.getAttendeeByEmail(username);
        if (_attendee == null) {
            yield ErrorAction(errorMessages['attendee-title'], errorMessages['attendee-desc'] + username);
            return;
        }

        if (!event.isRegistered(_attendee.id)) {
            yield ErrorAction(errorMessages['register-title'], username + errorMessages['register-desc']);
            return;
        }

        Team team = await this._teamService.getAttendeeTeam(_attendee);
        yield SearchCompletedAction(_attendee, team);
        return;
    }

    Stream<dynamic> _scan(Map<String, String> errorMessages) async* {
        try {
            String username = await _qrCodeReader.scan();
            if (username != null) {
                yield SearchAction(username, errorMessages);
            }
        } catch (err) {
            print('An error occured while trying to scan for qr code: $err');
            yield ErrorAction(errorMessages['permission-title'], errorMessages['permission-desc']);
        }
    }

    Stream<dynamic> _reset() async* {
        _attendee = null;
    }

    Stream<dynamic> _getCurrentAttendee(Completer completer) async* {
        Attendee attendee =  await _attendeesService.getAttendeeInfo();
        completer.complete(attendee.role);
        yield SetCurrentAttendeeAction(attendee);
    }
}