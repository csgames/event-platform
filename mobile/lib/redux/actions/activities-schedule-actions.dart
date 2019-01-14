import 'dart:async';

import 'package:CSGamesApp/domain/activity.dart';

class LoadActivitiesScheduleAction {
  final String eventId;
  final String code;
  final Completer completer;

  LoadActivitiesScheduleAction(this.eventId, this.code, {Completer completer})
    : this.completer = completer ?? Completer();
}

class ActivitiesScheduleLoadedAction {
  final Map<String, Map<String, List<Activity>>> activities;

  ActivitiesScheduleLoadedAction(this.activities);
}

class ActivitiesScheduleNotLoadedAction {}

class ResetScheduleAction {}