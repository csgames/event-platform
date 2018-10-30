import 'package:PolyHxApp/redux/actions/activities-schedule-actions.dart';
import 'package:PolyHxApp/redux/states/activities-schedule-state.dart';
import 'package:redux/redux.dart';

final activitiesScheduleReducer = combineReducers<ActivitiesScheduleState>([
  TypedReducer<ActivitiesScheduleState, ActivitiesScheduleLoadedAction>(_setLoadedActivities),
  TypedReducer<ActivitiesScheduleState, ActivitiesScheduleNotLoadedAction>(_setNoActivities),
  TypedReducer<ActivitiesScheduleState, LoadActivitiesScheduleAction>(_onLoadActivities),
  TypedReducer<ActivitiesScheduleState, ResetScheduleAction>(_setInitial)
]);

ActivitiesScheduleState _setLoadedActivities(ActivitiesScheduleState state, ActivitiesScheduleLoadedAction action) {
  return ActivitiesScheduleState(activities: action.activities, isLoading: false, hasErrors: false);
}

ActivitiesScheduleState _setNoActivities(ActivitiesScheduleState state, ActivitiesScheduleNotLoadedAction action) {
  return ActivitiesScheduleState.error();
}

ActivitiesScheduleState _onLoadActivities(ActivitiesScheduleState state, LoadActivitiesScheduleAction action) {
  return ActivitiesScheduleState.loading();
}

ActivitiesScheduleState _setInitial(ActivitiesScheduleState state, ResetScheduleAction action) {
  return ActivitiesScheduleState.initial();
}