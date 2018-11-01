import 'package:PolyHxApp/domain/activity.dart';

class LoadActivitiesScheduleAction {
  final String eventId;
  final String code;

  LoadActivitiesScheduleAction(this.eventId, this.code);
}

class ActivitiesScheduleLoadedAction {
  final Map<String, List<Activity>> activities;

  ActivitiesScheduleLoadedAction(this.activities);
}

class ActivitiesScheduleNotLoadedAction {}

class ResetScheduleAction {}