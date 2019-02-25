import 'package:CSGamesApp/redux/actions/event-actions.dart';
import 'package:CSGamesApp/redux/actions/login-actions.dart';
import 'package:CSGamesApp/redux/states/event-state.dart';
import 'package:redux/redux.dart';

final eventReducer = combineReducers<EventState>([
  TypedReducer<EventState, EventsLoadedAction>(_setLoadedEvents),
  TypedReducer<EventState, EventsNotLoadedAction>(_setNoEvents),
  TypedReducer<EventState, LoadEventsAction>(_onLoadEvents),
  TypedReducer<EventState, InitAction>(_setInitial),
  TypedReducer<EventState, LogOut>(_setInitial)
]);

EventState _setLoadedEvents(EventState eventstate, EventsLoadedAction action) {
  return EventState(events: action.events, isLoading: false, hasErrors: false);
}

EventState _setNoEvents(EventState eventstate, EventsNotLoadedAction action) {
  return EventState.error();
}

EventState _onLoadEvents(EventState eventstate, LoadEventsAction action) {
  return EventState.loading();
}

EventState _setInitial(EventState eventstate, dynamic action) {
  return EventState.initial();
}
