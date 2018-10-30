import 'package:PolyHxApp/redux/actions/event-actions.dart';
import 'package:PolyHxApp/redux/states/event-state.dart';
import 'package:redux/redux.dart';

final eventReducer = combineReducers<EventState>([
  TypedReducer<EventState, EventsLoadedAction>(_setLoadedEvents),
  TypedReducer<EventState, EventsNotLoadedAction>(_setNoEvents),
  TypedReducer<EventState, LoadEventsAction>(_onLoadEvents),
  TypedReducer<EventState, ResetAction>(_setLoading),
  TypedReducer<EventState, InitAction>(_setInitial)
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

EventState _setInitial(EventState eventstate, InitAction action) {
  return EventState.initial();
}

EventState _setLoading(EventState eventstate, ResetAction action) {
  return EventState.loading();
}