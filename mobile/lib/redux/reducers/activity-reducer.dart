import 'package:CSGamesApp/redux/actions/activity-actions.dart';
import 'package:CSGamesApp/redux/states/activity-state.dart';
import 'package:redux/redux.dart';

final activityReducer = combineReducers<ActivityState>([
  TypedReducer<ActivityState, ResetActivity>(_setInitial),
  TypedReducer<ActivityState, ScanError>(_setError),
  TypedReducer<ActivityState, AttendeeScanned>(_setScanned)
]);

ActivityState _setError(_, dynamic action) {
  return ActivityState(isLoading: false, hasErrors: true, isScanned: false, activity: null, errorTitle: action.title, errorContent: action.content);
}

ActivityState _setInitial(_, ResetActivity action) {
  return ActivityState.initial();
}

ActivityState _setScanned(_, AttendeeScanned action) {
  return ActivityState(isLoading: false, hasErrors: false, isScanned: true, attendee: action.attendee, activity: action.activity, errorTitle: '', errorContent: '');
}
