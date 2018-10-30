import 'package:PolyHxApp/domain/activity.dart';

class LoadActivitiesScheduleAction {
  final String eventId;

  LoadActivitiesScheduleAction(this.eventId);
}

class ActivitiesScheduleLoadedAction {
  final Map<String, List<Activity>> activities;

  ActivitiesScheduleLoadedAction(this.activities);
}

class ActivitiesScheduleNotLoadedAction {}

class ResetScheduleAction {}