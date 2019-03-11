import 'package:CSGamesApp/redux/actions/activities-schedule-actions.dart';
import 'package:CSGamesApp/redux/actions/activities-subscription-actions.dart';
import 'package:CSGamesApp/redux/state.dart';
import 'package:CSGamesApp/services/activities.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ActivityDescriptionMiddleware extends EpicClass<AppState> {
    final ActivitiesService _activitiesService;

    ActivityDescriptionMiddleware(this._activitiesService);

    @override
    Stream call(Stream actions, EpicStore<AppState> store) {
        return Observable.merge([
            Observable(actions)
                .ofType(TypeToken<SubscribeAction>())
                .concatMap((action) => _subscribe(action.activityId, store.state.currentAttendee.id)),
            Observable(actions)
                .ofType(TypeToken<VerifySubscriptionAction>())
                .concatMap((action) => _verify(action.activityId, store.state.currentAttendee.id))
        ]);
    }

    Stream<dynamic> _subscribe(String activityId, String attendeeId) async* {
        if (attendeeId == '') {
            yield NotSubscribedAction(activityId);
            return;
        }

        yield SubscribedAction(activityId, await _activitiesService.addSubscriptionToActivity(attendeeId, activityId));
        return;
    }

    Stream<dynamic> _verify(String activityId, String attendeeId) async* {
        if (attendeeId == '') {
            yield NotSubscribedAction(activityId);
            return;
        }

        yield SubscribedAction(activityId, await _activitiesService.verifyAttendeeSubscription(attendeeId, activityId));
        return;
    }
}