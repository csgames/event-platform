import 'package:PolyHxApp/domain/event.dart';
import 'package:PolyHxApp/redux/actions/actions.dart';
import 'package:redux/redux.dart';

final eventsReducer = combineTypedReducers<List<Event>>([
  new ReducerBinding<List<Event>, EventsLoadedAction>(_setLoadedEvents),
  new ReducerBinding<List<Event>, EventsNotLoadedAction>(_setNoEvents),
]);

List<Event> _setLoadedEvents(List<Event> events, EventsLoadedAction action) {
  return action.events;
}

List<Event> _setNoEvents(List<Event> events, EventsNotLoadedAction action) {
  return [];
}