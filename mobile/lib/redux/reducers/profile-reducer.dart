import 'package:PolyHxApp/redux/actions/profile-actions.dart';
import 'package:PolyHxApp/redux/states/profile-state.dart';
import 'package:redux/redux.dart';

final profileReducer = combineReducers<ProfileState>([
  TypedReducer<ProfileState, ScannedAction>(_setScanned),
  TypedReducer<ProfileState, ErrorAction>(_setError),
  TypedReducer<ProfileState, ResetProfileAction>(_setInitial)
]);

ProfileState _setScanned(ProfileState state, ScannedAction action) {
  return ProfileState.scanned();
}

ProfileState _setError(ProfileState state, ErrorAction action) {
  return ProfileState(isScanned: false, hasErrors: true, errorTitle: action.title, errorDescription: action.description);
}

ProfileState _setInitial(ProfileState state, ResetProfileAction action) {
  return ProfileState.initial();
}