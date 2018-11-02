import 'package:PolyHxApp/domain/activity.dart';
import 'package:meta/meta.dart';

@immutable
class ActivitiesScheduleState {
  final Map<String, Map<String, List<Activity>>> activities;
  final bool isLoading;
  final bool hasErrors;

  ActivitiesScheduleState({this.activities, this.isLoading, this.hasErrors});

  factory ActivitiesScheduleState.initial() => ActivitiesScheduleState(activities: {}, isLoading:  false, hasErrors:  false);

  factory ActivitiesScheduleState.loading() => ActivitiesScheduleState(activities: {}, isLoading:  true, hasErrors:  false);

  factory ActivitiesScheduleState.error() => ActivitiesScheduleState(activities: {}, isLoading:  false, hasErrors:  true);
}