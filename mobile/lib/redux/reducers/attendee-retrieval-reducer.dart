import 'package:CSGamesApp/redux/actions/attendee-retrieval-actions.dart';
import 'package:CSGamesApp/redux/states/attendee-retrieval-state.dart';
import 'package:redux/redux.dart';

final attendeeRetrievalReducer = combineReducers<AttendeeRetrievalState>([
  TypedReducer<AttendeeRetrievalState, NfcAssignedAction>(_setNfcAssigned),
  TypedReducer<AttendeeRetrievalState, SearchAction>(_setLoading),
  TypedReducer<AttendeeRetrievalState, ErrorAction>(_setError),
  TypedReducer<AttendeeRetrievalState, SearchCompletedAction>(_setSearchCompleted),
  TypedReducer<AttendeeRetrievalState, NfcAlreadyAssignedAction>(_setNfcScannedError),
  TypedReducer<AttendeeRetrievalState, CleanAction>(_setClean),
  TypedReducer<AttendeeRetrievalState, ResetAttendeeAction>(_setNoAttendee),
  TypedReducer<AttendeeRetrievalState, InitAction>(_setInit),
  TypedReducer<AttendeeRetrievalState, UnsubscribeAction>(_setInitial)
]);

AttendeeRetrievalState _setInitial(AttendeeRetrievalState state, UnsubscribeAction action) {
    return AttendeeRetrievalState.initial();
}

AttendeeRetrievalState _setInit(AttendeeRetrievalState state, InitAction action) {
    return AttendeeRetrievalState(
        isInit: true,
        isLoading: false,
        hasErrors: false,
        isScanned: false,
        idSaved: false,
        errorTitle: null,
        errorDescription: null,
        attendee: state.attendee
    );
}

AttendeeRetrievalState _setClean(AttendeeRetrievalState state, CleanAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: false,
    idSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    isInit: true
  );
}

AttendeeRetrievalState _setNfcScannedError(AttendeeRetrievalState state, NfcAlreadyAssignedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: true,
    idSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    isInit: true
  );
}

AttendeeRetrievalState _setNfcAssigned(AttendeeRetrievalState state, NfcAssignedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: false,
    isScanned: true,
    idSaved: action.idSaved,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    isInit: true
  );
}

AttendeeRetrievalState _setLoading(AttendeeRetrievalState state, SearchAction action) {
  return AttendeeRetrievalState.loading();
}

AttendeeRetrievalState _setNoAttendee(AttendeeRetrievalState state, ResetAttendeeAction action) {
    return AttendeeRetrievalState(
        isLoading: false,
        hasErrors: false,
        isScanned: false,
        idSaved: false,
        isInit: true,
        errorTitle: '',
        errorDescription: '',
        attendee: null
    );
}

AttendeeRetrievalState _setError(AttendeeRetrievalState state, ErrorAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: false,
    idSaved: false,
    errorTitle: action.title,
    errorDescription: action.description,
    attendee: null,
    isInit: false
  );
}

AttendeeRetrievalState _setSearchCompleted(AttendeeRetrievalState state, SearchCompletedAction action) {
  return AttendeeRetrievalState(
    isLoading: false,
    hasErrors: true,
    isScanned: false,
    idSaved: false,
    errorTitle: '',
    errorDescription: '',
    attendee: action.attendee,
    isInit: false
  );
}
