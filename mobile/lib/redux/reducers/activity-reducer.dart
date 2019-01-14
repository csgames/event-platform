import 'package:CSGamesApp/redux/actions/activity-actions.dart';
import 'package:CSGamesApp/redux/states/activity-state.dart';
import 'package:redux/redux.dart';

final activityReducer = combineReducers<ActivityState>([
  TypedReducer<ActivityState, RaffleAction>(_setRaffleAction),
  TypedReducer<ActivityState, WinnerSelected>(_setWinnerAction),
  TypedReducer<ActivityState, RaffleError>(_setError),  
  TypedReducer<ActivityState, ResetActivity>(_setInitial),
  TypedReducer<ActivityState, ScanError>(_setError),
  TypedReducer<ActivityState, AttendeeScanned>(_setScanned)
]);

ActivityState _setRaffleAction(ActivityState state, RaffleAction action) {
  return ActivityState.loading();
}

ActivityState _setWinnerAction(ActivityState state, WinnerSelected action) {
  return ActivityState(isLoading: false, hasErrors: false, isScanned: false, winner: action.winner, user: null, activity: null, errorTitle: '', errorContent: '');
}

ActivityState _setError(ActivityState state, dynamic action) {
  return ActivityState(isLoading: true, hasErrors: true, isScanned: false, winner: null, user: null, activity: null, errorTitle: action.title, errorContent: action.content);
}

ActivityState _setInitial(ActivityState state, ResetActivity action) {
  return ActivityState.initial();
}

ActivityState _setScanned(ActivityState state, AttendeeScanned action) {
  return ActivityState(isLoading: false, hasErrors: false, isScanned: true, winner: null, user: action.user, activity: action.activity, errorTitle: '', errorContent: '');
}