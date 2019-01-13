import 'dart:async';

import 'package:PolyHxApp/domain/activity.dart';
import 'package:PolyHxApp/redux/actions/activities-schedule-actions.dart';
import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/services/events.service.dart';
import 'package:PolyHxApp/services/schedule.service.dart';
import 'package:redux_epics/redux_epics.dart';
import 'package:rxdart/rxdart.dart';

class ActivitiesScheduleMiddleware implements EpicClass<AppState> {
  final EventsService eventsService;
  final ScheduleService scheduleService;

  ActivitiesScheduleMiddleware(this.eventsService, this.scheduleService);

  @override
  Stream call(Stream actions, EpicStore<AppState> store) {
    return Observable(actions)
      .ofType(TypeToken<LoadActivitiesScheduleAction>())
      .switchMap((action) => _fetchActivities(action.eventId, action.code, action.completer));
  }

  Stream<dynamic> _fetchActivities(String eventId, String code, Completer completer) async* {
    try {
      List<Activity> activities = await this.eventsService.getActivitiesForEvent(eventId);
      completer.complete(activities);
      Map<String, Map<String, List<Activity>>> activitiesPerDay = scheduleService.getActivitiesPerDay(activities, code);
      yield ActivitiesScheduleLoadedAction(activitiesPerDay);
    } catch (err) {
      print('An error occured while getting the activities: $err');
      yield ActivitiesScheduleNotLoadedAction();
    }
  }
}