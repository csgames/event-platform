import 'dart:async';

import 'package:CSGamesApp/domain/activity.dart';
import 'package:CSGamesApp/domain/attendee.dart';
import 'package:CSGamesApp/domain/team.dart';
import 'package:CSGamesApp/redux/actions/activity-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/activities.service.dart';
import 'package:CSGamesApp/services/attendees.service.dart';
import 'package:CSGamesApp/services/nfc.service.dart';
import 'package:CSGamesApp/services/team.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ActivityMiddleware implements EpicClass<AppState> {
    final NfcService _nfcService;
    final AttendeesService _attendeesService;
    final ActivitiesService _activitiesService;
    final TeamService _teamService;

    ActivityMiddleware(
        this._nfcService,
        this._attendeesService,
        this._activitiesService,
        this._teamService
    );

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<InitAction>())
                .debounce(Duration(milliseconds: 500))
                .switchMap((action) => _listen(action.activityId, action.errorMessages, actions)),
            Observable(actions)
                .ofType(TypeToken<GetCurrentActivity>())
                .switchMap((action) => _getCurrentActivity(action.activityId)),
        ]);
    }

    Stream<dynamic> _getCurrentActivity(String activityId) async* {
        yield SetCurrentActivity(await _activitiesService.getActivity(activityId));
    }

    Stream<dynamic> _listen(String activityId, Map<String, String> errorMessages, Stream<dynamic> actions) {
        return Observable(_nfcService.nfcStream.asBroadcastStream())
            .takeUntil(actions.where((action) => action is PopAction))
            .asyncMap((id) async {
                Attendee attendee = await _attendeesService.getAttendeeByPublicId(id);
                if (attendee == null) {
                    return ScanError(errorMessages['tag-title'], errorMessages['tag-desc']);
                }

                Activity activity = await _activitiesService.addAttendeeToActivity(attendee.id, activityId);

                Team team = await this._teamService.getAttendeeTeam(attendee);
                return AttendeeScanned(activity, attendee, team);
            });
    }
}
