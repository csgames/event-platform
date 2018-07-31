import 'package:PolyHxApp/redux/state.dart';
import 'package:PolyHxApp/redux/reducers/events-reducer.dart';
import 'package:PolyHxApp/redux/reducers/current-event-reducer.dart';

AppState appReducer(AppState state, action) {
  return AppState(
    events: eventsReducer(state.events, action),
    currentEvent: currentEventReducer(state.currentEvent, action)
  );
}