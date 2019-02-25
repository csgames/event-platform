import 'dart:async';

import 'package:CSGamesApp/domain/activity.dart';

class LoadActivitiesScheduleAction {
  final String code;
  final Completer completer;

  LoadActivitiesScheduleAction(this.code, {Completer completer})
    : this.completer = completer ?? Completer();
}

class ActivitiesScheduleLoadedAction {
  final Map<String, Map<String, List<Activity>>> activities;

  ActivitiesScheduleLoadedAction(this.activities);
}

class ActivitiesScheduleNotLoadedAction {}

class ResetScheduleAction {}