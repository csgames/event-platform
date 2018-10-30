import 'package:PolyHxApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:PolyHxApp/redux/states/attendee-retrieval-state.dart';
import 'package:redux/redux.dart';

final attendeeRetrievalReducer = combineReducers<AttendeeRetrievalState>([
  TypedReducer<AttendeeRetrievalState, NfcAssignedAction>(_setNfcAssigned),
  TypedReducer<AttendeeRetrievalState, SearchAction>(_setLoading),
  TypedReducer<AttendeeRetrievalState, ErrorAction>(_setError),
  TypedReducer<AttendeeRetrievalState, SearchCompletedAction>(_setSearchCompleted),
  TypedReducer<AttendeeRetrievalState, ResetAction>(_setInitial),
  TypedReducer<AttendeeRetrievalState, NfcAlreadyAssignedAction>(_setNfcScannedError),
  TypedReducer<AttendeeRetrievalState, CleanAction>(_setClean)
]);

AttendeeRetrievalState _setClean(AttendeeRetrievalState state, CleanAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    statusSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    user: action.user
  );
}

AttendeeRetrievalState _setNfcScannedError(AttendeeRetrievalState state, NfcAlreadyAssignedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: true,
    idSaved: false,
    statusSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    user: action.user
  );
}

AttendeeRetrievalState _setNfcAssigned(AttendeeRetrievalState state, NfcAssignedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: true,
    idSaved: action.idSaved,
    statusSaved: action.statusSaved,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    user: action.user
  );
}

AttendeeRetrievalState _setLoading(AttendeeRetrievalState state, SearchAction action) {
  return AttendeeRetrievalState.loading();
}

AttendeeRetrievalState _setError(AttendeeRetrievalState state, ErrorAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: false,
    idSaved: false,
    statusSaved: false,
    errorTitle: action.title,
    errorDescription: action.description,
    attendee: null,
    user: null
  );
}

AttendeeRetrievalState _setSearchCompleted(AttendeeRetrievalState state, SearchCompletedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: false,
    idSaved: false,
    statusSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    user: action.user
  );
}

AttendeeRetrievalState _setInitial(AttendeeRetrievalState state, ResetAction action) {
  return AttendeeRetrievalState.initial();
}